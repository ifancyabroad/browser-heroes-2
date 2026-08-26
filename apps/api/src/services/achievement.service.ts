import { achievementIds, type AchievementId, type Attribute, type ClassId } from "@app/content";
import {
	hasReachedArmourClassThreshold,
	hasReachedMaximumAttribute,
	hasReachedMaxHpThreshold,
	type EngineEvent,
	type RunState,
} from "@app/engine";
import type { AchievementUnlockView, GetAchievementsResponse } from "@app/shared";
import type { ClientSession } from "mongoose";
import { AchievementUnlockModel } from "../models/achievementUnlock.model";
import {
	evaluateLifetimeAchievementProgress,
	getLifetimeAchievementProgress,
	type LifetimeProgressTransition,
} from "./lifetimeProgress.service";

const CLASS_VICTORY_ACHIEVEMENTS: Record<ClassId, AchievementId> = {
	artificer: "complete_game_artificer",
	battlemage: "complete_game_battlemage",
	warrior: "complete_game_warrior",
	mage: "complete_game_mage",
	paladin: "complete_game_paladin",
	priest: "complete_game_priest",
	shadowblade: "complete_game_shadowblade",
	rogue: "complete_game_rogue",
};

const ATTRIBUTE_ACHIEVEMENTS: Record<Attribute, AchievementId> = {
	strength: "max_strength",
	dexterity: "max_dexterity",
	constitution: "max_constitution",
	intelligence: "max_intelligence",
	wisdom: "max_wisdom",
	charisma: "max_charisma",
};

const MAX_HP_ACHIEVEMENT_THRESHOLD = 150;
const ARMOUR_CLASS_ACHIEVEMENT_THRESHOLD = 25;
const LEVEL_ACHIEVEMENT_THRESHOLD = 10;
const GOLD_ACHIEVEMENT_THRESHOLD = 10_000;
const FAST_GAME_DAY_THRESHOLD = 5;

const STREAK_ACHIEVEMENTS = [
	{ threshold: 10, achievementId: "reach_streak_10" },
	{ threshold: 25, achievementId: "reach_streak_25" },
	{ threshold: 50, achievementId: "reach_streak_50" },
] as const satisfies readonly { threshold: number; achievementId: AchievementId }[];

type AchievementSource = {
	runId?: string;
	combatId?: string;
	ghostId?: string;
};

export async function getAchievementUnlocks(userId: string): Promise<AchievementUnlockView[]> {
	const unlocks = await AchievementUnlockModel.find({ userId })
		.sort({ unlockedAt: 1, achievementId: 1 })
		.lean();

	return unlocks.map((unlock) => ({
		achievementId: unlock.achievementId,
		unlockedAt: unlock.unlockedAt.toISOString(),
	}));
}

export async function getAchievements(userId: string): Promise<GetAchievementsResponse> {
	const [unlocks, progress] = await Promise.all([
		getAchievementUnlocks(userId),
		getLifetimeAchievementProgress(userId),
	]);
	return { unlocks, progress };
}

export async function unlockAchievements(input: {
	userId: string;
	achievementIds: readonly AchievementId[];
	source?: AchievementSource;
	session: ClientSession;
}): Promise<AchievementUnlockView[]> {
	const unlockedAt = new Date();
	const newlyUnlocked: AchievementUnlockView[] = [];

	for (const achievementId of new Set(input.achievementIds)) {
		const result = await AchievementUnlockModel.updateOne(
			{ userId: input.userId, achievementId },
			{
				$setOnInsert: {
					userId: input.userId,
					achievementId,
					unlockedAt,
					...input.source,
				},
			},
			{ upsert: true, session: input.session },
		);

		if (result.upsertedCount > 0) {
			newlyUnlocked.push({
				achievementId,
				unlockedAt: unlockedAt.toISOString(),
			});
		}
	}

	return newlyUnlocked;
}

export async function processRunActionAchievements(input: {
	actingUserId: string;
	previousState: RunState;
	nextState: RunState;
	events: readonly EngineEvent[];
	ghostOutcome: "ghost_won" | "ghost_lost" | null;
	ghostOwnerId: string | null;
	lifetimeProgress: LifetimeProgressTransition | null;
	source: AchievementSource;
	session: ClientSession;
}): Promise<AchievementUnlockView[]> {
	const actingUserAchievementIds = evaluateRunActionAchievements({
		previousState: input.previousState,
		nextState: input.nextState,
		events: input.events,
	});
	actingUserAchievementIds.push(...evaluateLifetimeAchievementProgress(input.lifetimeProgress));

	if (input.ghostOutcome === "ghost_won" && input.ghostOwnerId === input.actingUserId) {
		actingUserAchievementIds.push("die_to_own_ghost");
	}

	const newlyUnlocked = await unlockAchievements({
		userId: input.actingUserId,
		achievementIds: actingUserAchievementIds,
		source: input.source,
		session: input.session,
	});

	if (
		input.ghostOutcome === "ghost_won" &&
		input.ghostOwnerId &&
		input.ghostOwnerId !== input.actingUserId
	) {
		await unlockAchievements({
			userId: input.ghostOwnerId,
			achievementIds: ["ghost_end_other_run"],
			source: input.source,
			session: input.session,
		});
	}

	return newlyUnlocked;
}

export function evaluateRunActionAchievements(input: {
	previousState: RunState;
	nextState: RunState;
	events: readonly EngineEvent[];
}): AchievementId[] {
	const unlocked = new Set<AchievementId>();

	for (const event of input.events) {
		if (event.type === "COMBAT_ENDED" && event.outcome === "victory") {
			if (event.encounterType === "boss") {
				unlocked.add("defeat_boss");
			}

			if (event.encounterType === "ghost") {
				unlocked.add("defeat_ghost");
			}

			if (event.defeatedFinalBoss) {
				unlocked.add("complete_game");
				unlocked.add(CLASS_VICTORY_ACHIEVEMENTS[input.nextState.hero.classId]);

				if (input.nextState.day <= FAST_GAME_DAY_THRESHOLD) {
					unlocked.add("complete_game_by_day_5");
				}
			}

			if (event.completedEndlessCycle) {
				unlocked.add("complete_endless_cycle");
			}

			if (
				event.encounterType === "boss" &&
				event.finishingPlayerAction?.targetStartedAtFullHp
			) {
				unlocked.add("defeat_full_health_boss");
			}
		}

		if (
			(event.type === "ITEM_BOUGHT" ||
				(event.type === "REWARD_SELECTED" && event.rewardType === "item")) &&
			event.item.rarity === "legendary"
		) {
			unlocked.add("acquire_legendary_item");
		}
	}

	for (const attribute of Object.keys(ATTRIBUTE_ACHIEVEMENTS) as Attribute[]) {
		if (
			!hasReachedMaximumAttribute(input.previousState.hero, attribute) &&
			hasReachedMaximumAttribute(input.nextState.hero, attribute)
		) {
			unlocked.add(ATTRIBUTE_ACHIEVEMENTS[attribute]);
		}
	}

	if (
		!hasReachedMaxHpThreshold(input.previousState.hero, MAX_HP_ACHIEVEMENT_THRESHOLD) &&
		hasReachedMaxHpThreshold(input.nextState.hero, MAX_HP_ACHIEVEMENT_THRESHOLD)
	) {
		unlocked.add("reach_150_max_hp");
	}

	if (
		!hasReachedArmourClassThreshold(
			input.previousState.hero,
			ARMOUR_CLASS_ACHIEVEMENT_THRESHOLD,
		) &&
		hasReachedArmourClassThreshold(input.nextState.hero, ARMOUR_CLASS_ACHIEVEMENT_THRESHOLD)
	) {
		unlocked.add("reach_25_armour_class");
	}

	if (
		crossedThreshold(
			input.previousState.hero.level,
			input.nextState.hero.level,
			LEVEL_ACHIEVEMENT_THRESHOLD,
		)
	) {
		unlocked.add("reach_level_10");
	}

	if (
		crossedThreshold(input.previousState.gold, input.nextState.gold, GOLD_ACHIEVEMENT_THRESHOLD)
	) {
		unlocked.add("hold_10000_gold");
	}

	for (const streakAchievement of STREAK_ACHIEVEMENTS) {
		if (
			crossedThreshold(
				input.previousState.streak,
				input.nextState.streak,
				streakAchievement.threshold,
			)
		) {
			unlocked.add(streakAchievement.achievementId);
		}
	}

	return achievementIds.filter((achievementId) => unlocked.has(achievementId));
}

function crossedThreshold(previous: number, next: number, threshold: number): boolean {
	return previous < threshold && next >= threshold;
}
