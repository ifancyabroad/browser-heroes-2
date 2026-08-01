import type { AchievementId, ClassId } from "@app/content";
import type { EngineEvent } from "@app/engine";
import type { AchievementProgressView } from "@app/shared";
import type { ClientSession } from "mongoose";
import { UserModel } from "../models/user.model";

const ORIGINAL_CLASS_IDS = [
	"battlemage",
	"fighter",
	"mage",
	"paladin",
	"priest",
	"shadowblade",
	"thief",
] as const satisfies readonly ClassId[];

type LifetimeCounter =
	| "kills"
	| "bossesDefeated"
	| "ghostsDefeated"
	| "goldEarned"
	| "legendaryItemsAcquired"
	| "gamesCompleted"
	| "healingPotionsUsed";

const LIFETIME_ACHIEVEMENTS = [
	{ achievementId: "lifetime_kills_100", counter: "kills", target: 100 },
	{ achievementId: "lifetime_kills_500", counter: "kills", target: 500 },
	{ achievementId: "lifetime_kills_1000", counter: "kills", target: 1_000 },
	{ achievementId: "lifetime_bosses_25", counter: "bossesDefeated", target: 25 },
	{ achievementId: "lifetime_ghosts_10", counter: "ghostsDefeated", target: 10 },
	{ achievementId: "lifetime_gold_100000", counter: "goldEarned", target: 100_000 },
	{
		achievementId: "lifetime_legendary_items_10",
		counter: "legendaryItemsAcquired",
		target: 10,
	},
	{ achievementId: "lifetime_game_wins_5", counter: "gamesCompleted", target: 5 },
	{ achievementId: "lifetime_potions_100", counter: "healingPotionsUsed", target: 100 },
] as const satisfies readonly {
	achievementId: AchievementId;
	counter: LifetimeCounter;
	target: number;
}[];

export type LifetimeStats = Record<LifetimeCounter, number> & {
	completedGameClassIds: ClassId[];
};

export type LifetimeProgressTransition = {
	previous: LifetimeStats;
	current: LifetimeStats;
};

type LifetimeStatsDelta = Partial<Record<LifetimeCounter, number>> & {
	completedGameClassId?: ClassId;
};

export async function recordLifetimeProgress(input: {
	userId: string;
	classId: ClassId;
	events: readonly EngineEvent[];
	session: ClientSession;
}): Promise<LifetimeProgressTransition | null> {
	const delta = deriveLifetimeStatsDelta(input.events, input.classId);

	if (!hasLifetimeStatsDelta(delta)) {
		return null;
	}

	const increments = Object.fromEntries(
		LIFETIME_COUNTERS.flatMap((counter) =>
			delta[counter] ? [[`lifetimeStats.${counter}`, delta[counter]]] : [],
		),
	);
	const update = {
		...(Object.keys(increments).length > 0 ? { $inc: increments } : {}),
		...(delta.completedGameClassId
			? { $addToSet: { "lifetimeStats.completedGameClassIds": delta.completedGameClassId } }
			: {}),
	};

	const userBeforeUpdate = await UserModel.findByIdAndUpdate(input.userId, update, {
		new: false,
		session: input.session,
	});

	if (!userBeforeUpdate) {
		throw new Error("USER_NOT_FOUND");
	}

	const previous = copyLifetimeStats(userBeforeUpdate.lifetimeStats);
	return { previous, current: applyLifetimeStatsDelta(previous, delta) };
}

export function evaluateLifetimeAchievementProgress(
	transition: LifetimeProgressTransition | null,
): AchievementId[] {
	if (!transition) {
		return [];
	}

	const unlocked: AchievementId[] = LIFETIME_ACHIEVEMENTS.filter(
		({ counter, target }) =>
			transition.previous[counter] < target && transition.current[counter] >= target,
	).map(({ achievementId }) => achievementId);

	const previousClasses = countOriginalCompletedClasses(
		transition.previous.completedGameClassIds,
	);
	const currentClasses = countOriginalCompletedClasses(transition.current.completedGameClassIds);
	if (
		previousClasses < ORIGINAL_CLASS_IDS.length &&
		currentClasses >= ORIGINAL_CLASS_IDS.length
	) {
		unlocked.push("complete_game_all_original_classes");
	}

	return unlocked;
}

export async function getLifetimeAchievementProgress(
	userId: string,
): Promise<AchievementProgressView[]> {
	const user = await UserModel.findById(userId).select("lifetimeStats").lean();
	if (!user) {
		throw new Error("USER_NOT_FOUND");
	}

	return projectLifetimeAchievementProgress(copyLifetimeStats(user.lifetimeStats));
}

export function projectLifetimeAchievementProgress(
	stats: LifetimeStats,
): AchievementProgressView[] {
	return [
		...LIFETIME_ACHIEVEMENTS.map(({ achievementId, counter, target }) => ({
			achievementId,
			current: Math.min(stats[counter], target),
			target,
		})),
		{
			achievementId: "complete_game_all_original_classes",
			current: countOriginalCompletedClasses(stats.completedGameClassIds),
			target: ORIGINAL_CLASS_IDS.length,
		},
	];
}

export function deriveLifetimeStatsDelta(
	events: readonly EngineEvent[],
	classId: ClassId,
): LifetimeStatsDelta {
	const delta: LifetimeStatsDelta = {};

	for (const event of events) {
		if (event.type === "COMBAT_ENDED" && event.outcome === "victory") {
			increment(delta, "kills", 1);
			increment(delta, "goldEarned", event.reward.gold);

			if (event.encounterType === "boss") increment(delta, "bossesDefeated", 1);
			if (event.encounterType === "ghost") increment(delta, "ghostsDefeated", 1);
			if (event.defeatedFinalBoss) {
				increment(delta, "gamesCompleted", 1);
				delta.completedGameClassId = classId;
			}
		}

		if (event.type === "REWARD_SELECTED" && event.rewardType === "gold") {
			increment(delta, "goldEarned", event.amount);
		}

		if (
			(event.type === "ITEM_BOUGHT" ||
				(event.type === "REWARD_SELECTED" && event.rewardType === "item")) &&
			event.item.rarity === "legendary"
		) {
			increment(delta, "legendaryItemsAcquired", 1);
		}

		if (event.type === "HEALING_POTION_USED") {
			increment(delta, "healingPotionsUsed", 1);
		}
	}

	return delta;
}

const LIFETIME_COUNTERS: readonly LifetimeCounter[] = [
	"kills",
	"bossesDefeated",
	"ghostsDefeated",
	"goldEarned",
	"legendaryItemsAcquired",
	"gamesCompleted",
	"healingPotionsUsed",
];

function copyLifetimeStats(value: LifetimeStats): LifetimeStats {
	return {
		...value,
		completedGameClassIds: [...value.completedGameClassIds],
	};
}

function applyLifetimeStatsDelta(
	previous: LifetimeStats,
	delta: LifetimeStatsDelta,
): LifetimeStats {
	const current = copyLifetimeStats(previous);
	for (const counter of LIFETIME_COUNTERS) {
		current[counter] += delta[counter] ?? 0;
	}
	if (
		delta.completedGameClassId &&
		!current.completedGameClassIds.includes(delta.completedGameClassId)
	) {
		current.completedGameClassIds.push(delta.completedGameClassId);
	}
	return current;
}

function hasLifetimeStatsDelta(delta: LifetimeStatsDelta): boolean {
	return Boolean(
		delta.completedGameClassId ||
		LIFETIME_COUNTERS.some((counter) => (delta[counter] ?? 0) > 0),
	);
}

function countOriginalCompletedClasses(classIds: readonly ClassId[]): number {
	const completed = new Set(classIds);
	return ORIGINAL_CLASS_IDS.filter((classId) => completed.has(classId)).length;
}

function increment(delta: LifetimeStatsDelta, counter: LifetimeCounter, amount: number): void {
	delta[counter] = (delta[counter] ?? 0) + amount;
}
