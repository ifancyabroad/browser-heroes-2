import { achievementIds, type AchievementId, type Attribute, type ClassId } from "@app/content";
import { hasReachedMaximumAttribute, type EngineEvent, type RunState } from "@app/engine";
import type { AchievementUnlockView } from "@app/shared";
import type { ClientSession } from "mongoose";
import { AchievementUnlockModel } from "../models/achievementUnlock.model";

const CLASS_VICTORY_ACHIEVEMENTS: Record<ClassId, AchievementId> = {
	battlemage: "complete_game_battlemage",
	fighter: "complete_game_fighter",
	mage: "complete_game_mage",
	paladin: "complete_game_paladin",
	priest: "complete_game_priest",
	shadowblade: "complete_game_shadowblade",
	thief: "complete_game_thief",
};

const ATTRIBUTE_ACHIEVEMENTS: Record<Attribute, AchievementId> = {
	strength: "max_strength",
	dexterity: "max_dexterity",
	constitution: "max_constitution",
	intelligence: "max_intelligence",
	wisdom: "max_wisdom",
	charisma: "max_charisma",
};

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
	source: AchievementSource;
	session: ClientSession;
}): Promise<AchievementUnlockView[]> {
	const actingUserAchievementIds = evaluateRunActionAchievements({
		previousState: input.previousState,
		nextState: input.nextState,
		events: input.events,
	});

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

			if (event.defeatedFinalBoss) {
				unlocked.add("complete_game");
				unlocked.add(CLASS_VICTORY_ACHIEVEMENTS[input.nextState.hero.classId]);
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

	return achievementIds.filter((achievementId) => unlocked.has(achievementId));
}
