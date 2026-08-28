import type { EngineEvent } from "@app/engine";
import { beforeEach, describe, expect, it, vi } from "vitest";

const userModel = vi.hoisted(() => ({
	findByIdAndUpdate: vi.fn(),
}));

vi.mock("../models/user.model", () => ({ UserModel: userModel }));

import {
	deriveLifetimeStatsDelta,
	evaluateLifetimeAchievementProgress,
	projectLifetimeAchievementProgress,
	recordLifetimeProgress,
	type LifetimeStats,
} from "./lifetimeProgress.service";

const EMPTY_STATS: LifetimeStats = {
	kills: 0,
	bossesDefeated: 0,
	ghostsDefeated: 0,
	goldEarned: 0,
	legendaryItemsAcquired: 0,
	gamesCompleted: 0,
	healingPotionsUsed: 0,
	completedGameClassIds: [],
};

const COMBAT_EVENT_CONTEXT = {
	combatId: "combat-id",
	enemySourceId: "enemy-id",
	turnNumber: 1,
} as const;

describe("lifetimeProgress.service", () => {
	beforeEach(() => vi.clearAllMocks());

	it("derives account progress from general engine events", () => {
		const events: EngineEvent[] = [
			{
				...COMBAT_EVENT_CONTEXT,
				type: "COMBAT_ENDED",
				outcome: "victory",
				battleNumber: 100,
				encounterType: "boss",
				defeatedFinalBoss: true,
				completedEndlessCycle: false,
				finishingPlayerAction: null,
				reward: { gold: 50, xp: 10 },
			},
			{ type: "REWARD_SELECTED", rewardType: "gold", amount: 25 },
			{ type: "HEALING_POTION_USED", amount: 10, remainingPotions: 1 },
		];

		expect(deriveLifetimeStatsDelta(events, "warrior")).toEqual({
			kills: 1,
			goldEarned: 75,
			bossesDefeated: 1,
			gamesCompleted: 1,
			completedGameClassId: "warrior",
			healingPotionsUsed: 1,
		});
	});

	it("counts repeated legendary acquisitions and ghost victories", () => {
		const legendaryItem = {
			itemInstanceId: "item",
			itemId: "legendary-item",
			itemName: "Legendary",
			rarity: "legendary" as const,
		};
		const events: EngineEvent[] = [
			{
				type: "ITEM_BOUGHT",
				item: legendaryItem,
				equipmentSlot: "mainHand",
				price: 100,
			},
			{
				type: "REWARD_SELECTED",
				rewardType: "item",
				item: { ...legendaryItem, itemInstanceId: "reward" },
				equipmentSlot: "mainHand",
			},
			{
				...COMBAT_EVENT_CONTEXT,
				type: "COMBAT_ENDED",
				outcome: "victory",
				battleNumber: 12,
				encounterType: "ghost",
				defeatedFinalBoss: false,
				completedEndlessCycle: false,
				finishingPlayerAction: null,
				reward: { gold: 10, xp: 10 },
			},
		];

		expect(deriveLifetimeStatsDelta(events, "warrior")).toMatchObject({
			kills: 1,
			ghostsDefeated: 1,
			legendaryItemsAcquired: 2,
		});
	});

	it("unlocks every threshold crossed by one atomic update", () => {
		const previous = { ...EMPTY_STATS, kills: 99, goldEarned: 99_990 };
		const current = { ...previous, kills: 100, goldEarned: 100_010 };

		expect(evaluateLifetimeAchievementProgress({ previous, current })).toEqual([
			"lifetime_kills_100",
			"lifetime_gold_100000",
		]);
	});

	it("tracks unique original class victories and unlocks the eighth", () => {
		const firstSeven = [
			"artificer",
			"battlemage",
			"warrior",
			"mage",
			"paladin",
			"priest",
			"shadowblade",
		] as const;
		const previous = { ...EMPTY_STATS, completedGameClassIds: [...firstSeven] };
		const current = { ...previous, completedGameClassIds: [...firstSeven, "rogue" as const] };

		expect(evaluateLifetimeAchievementProgress({ previous, current })).toContain(
			"complete_game_all_original_classes",
		);
		expect(projectLifetimeAchievementProgress(current)).toContainEqual({
			achievementId: "complete_game_all_original_classes",
			current: 8,
			target: 8,
		});
	});

	it("unlocks Proven Champion on the tenth completed game", () => {
		const previous = { ...EMPTY_STATS, gamesCompleted: 9 };
		const current = { ...previous, gamesCompleted: 10 };

		expect(evaluateLifetimeAchievementProgress({ previous, current })).toContain(
			"lifetime_game_wins_10",
		);
		expect(projectLifetimeAchievementProgress(current)).toContainEqual({
			achievementId: "lifetime_game_wins_10",
			current: 10,
			target: 10,
		});
	});

	it("atomically increments the user and returns the before-and-after values", async () => {
		userModel.findByIdAndUpdate.mockResolvedValue({
			lifetimeStats: { ...EMPTY_STATS, kills: 99 },
		});

		const transition = await recordLifetimeProgress({
			userId: "user",
			classId: "warrior",
			events: [
				{
					...COMBAT_EVENT_CONTEXT,
					type: "COMBAT_ENDED",
					outcome: "victory",
					battleNumber: 1,
					encounterType: "standard",
					defeatedFinalBoss: false,
					completedEndlessCycle: false,
					finishingPlayerAction: null,
					reward: { gold: 5, xp: 5 },
				},
			],
			session: { id: "session" } as never,
		});

		expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
			"user",
			{ $inc: { "lifetimeStats.kills": 1, "lifetimeStats.goldEarned": 5 } },
			expect.objectContaining({ returnDocument: "before" }),
		);
		expect(transition?.previous.kills).toBe(99);
		expect(transition?.current.kills).toBe(100);
	});
});
