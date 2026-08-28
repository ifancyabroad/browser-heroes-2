import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestRunState } from "../test/createTestRun";

const achievementModel = vi.hoisted(() => ({
	find: vi.fn(),
	updateOne: vi.fn(),
}));

vi.mock("../models/achievementUnlock.model", () => ({
	AchievementUnlockModel: achievementModel,
}));

import {
	evaluateRunActionAchievements,
	processRunActionAchievements,
	unlockAchievements,
} from "./achievement.service";

const COMBAT_EVENT_CONTEXT = {
	combatId: "combat-id",
	enemySourceId: "enemy-id",
	turnNumber: 1,
} as const;

describe("achievement.service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("evaluates overlapping boss and final-boss achievements", () => {
		const previousState = createTestRunState();
		const nextState = structuredClone(previousState);
		nextState.battleNumber = 100;

		expect(
			evaluateRunActionAchievements({
				previousState,
				nextState,
				events: [
					{
						...COMBAT_EVENT_CONTEXT,
						type: "COMBAT_ENDED",
						outcome: "victory",
						battleNumber: 100,
						encounterType: "boss",
						defeatedFinalBoss: true,
						completedEndlessCycle: false,
						finishingPlayerAction: {
							type: "basic_attack",
							targetStartedAtFullHp: true,
						},
						reward: { gold: 1, xp: 1 },
					},
				],
			}),
		).toEqual(
			expect.arrayContaining([
				"defeat_boss",
				"defeat_full_health_boss",
				"complete_game",
				"complete_game_warrior",
				"complete_game_by_day_5",
			]),
		);
	});

	it("evaluates a ghost victory", () => {
		const state = createTestRunState();

		expect(
			evaluateRunActionAchievements({
				previousState: state,
				nextState: state,
				events: [
					{
						...COMBAT_EVENT_CONTEXT,
						type: "COMBAT_ENDED",
						outcome: "victory",
						battleNumber: 12,
						encounterType: "ghost",
						defeatedFinalBoss: false,
						completedEndlessCycle: false,
						finishingPlayerAction: null,
						reward: { gold: 1, xp: 1 },
					},
				],
			}),
		).toContain("defeat_ghost");
	});

	it("applies the day-five final-boss boundary", () => {
		const previousState = createTestRunState();
		const victoryEvent = {
			...COMBAT_EVENT_CONTEXT,
			type: "COMBAT_ENDED" as const,
			outcome: "victory" as const,
			battleNumber: 100,
			encounterType: "boss" as const,
			defeatedFinalBoss: true,
			completedEndlessCycle: false,
			finishingPlayerAction: null,
			reward: { gold: 1, xp: 1 },
		};
		const dayFiveState = structuredClone(previousState);
		dayFiveState.day = 5;
		const daySixState = structuredClone(previousState);
		daySixState.day = 6;

		expect(
			evaluateRunActionAchievements({
				previousState,
				nextState: dayFiveState,
				events: [victoryEvent],
			}),
		).toContain("complete_game_by_day_5");
		expect(
			evaluateRunActionAchievements({
				previousState,
				nextState: daySixState,
				events: [victoryEvent],
			}),
		).not.toContain("complete_game_by_day_5");
	});

	it("evaluates endless, legendary, and attribute achievements from facts", () => {
		const previousState = createTestRunState();
		previousState.hero.attributes.strength = 29;
		const nextState = structuredClone(previousState);
		nextState.hero.attributes.strength = 31;

		expect(
			evaluateRunActionAchievements({
				previousState,
				nextState,
				events: [
					{
						type: "ITEM_BOUGHT",
						item: {
							itemInstanceId: "item",
							itemId: "legend",
							itemName: "Legend",
							rarity: "legendary",
						},
						equipmentSlot: "mainHand",
						price: 1,
					},
					{
						...COMBAT_EVENT_CONTEXT,
						type: "COMBAT_ENDED",
						outcome: "victory",
						battleNumber: 200,
						encounterType: "boss",
						defeatedFinalBoss: false,
						completedEndlessCycle: true,
						finishingPlayerAction: null,
						reward: { gold: 1, xp: 1 },
					},
				],
			}),
		).toEqual(
			expect.arrayContaining([
				"acquire_legendary_item",
				"complete_endless_cycle",
				"max_strength",
			]),
		);
	});

	it("evaluates the effective health threshold", () => {
		const previousState = createTestRunState();
		previousState.hero.maxHp = 149;
		previousState.hero.currentHp = 99;

		const nextState = structuredClone(previousState);
		nextState.hero.maxHp = 150;
		nextState.hero.currentHp = 100;

		expect(evaluateRunActionAchievements({ previousState, nextState, events: [] })).toEqual(
			expect.arrayContaining(["reach_150_max_hp"]),
		);
	});

	it("evaluates level, gold, and every crossed streak threshold", () => {
		const previousState = createTestRunState();
		previousState.hero.level = 9;
		previousState.gold = 9_999;
		previousState.streak = 9;

		const nextState = structuredClone(previousState);
		nextState.hero.level = 10;
		nextState.gold = 10_000;
		nextState.streak = 50;

		expect(evaluateRunActionAchievements({ previousState, nextState, events: [] })).toEqual(
			expect.arrayContaining([
				"reach_level_10",
				"hold_10000_gold",
				"reach_streak_10",
				"reach_streak_25",
				"reach_streak_50",
			]),
		);
	});

	it("returns only newly inserted unlocks", async () => {
		achievementModel.updateOne
			.mockResolvedValueOnce({ upsertedCount: 1 })
			.mockResolvedValueOnce({ upsertedCount: 0 });

		const result = await unlockAchievements({
			userId: "user",
			achievementIds: ["defeat_boss", "complete_game"],
			session: { id: "session" } as never,
		});

		expect(result.map((unlock) => unlock.achievementId)).toEqual(["defeat_boss"]);
	});

	it("unlocks an own-ghost death for the acting user", async () => {
		achievementModel.updateOne.mockResolvedValue({ upsertedCount: 1 });
		const state = createTestRunState();

		const result = await processRunActionAchievements({
			actingUserId: "user",
			previousState: state,
			nextState: state,
			events: [],
			ghostOutcome: "ghost_won",
			ghostOwnerId: "user",
			lifetimeProgress: null,
			source: { ghostId: "ghost" },
			session: { id: "session" } as never,
		});

		expect(result.map((unlock) => unlock.achievementId)).toEqual(["die_to_own_ghost"]);
	});

	it("unlocks a cross-user kill for the ghost owner only", async () => {
		achievementModel.updateOne.mockResolvedValue({ upsertedCount: 1 });
		const state = createTestRunState();

		const result = await processRunActionAchievements({
			actingUserId: "defeated-user",
			previousState: state,
			nextState: state,
			events: [],
			ghostOutcome: "ghost_won",
			ghostOwnerId: "ghost-owner",
			lifetimeProgress: null,
			source: { ghostId: "ghost" },
			session: { id: "session" } as never,
		});

		expect(result).toEqual([]);
		expect(achievementModel.updateOne).toHaveBeenCalledWith(
			{ userId: "ghost-owner", achievementId: "ghost_end_other_run" },
			expect.any(Object),
			expect.any(Object),
		);
	});
});
