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
				"complete_game_fighter",
			]),
		);
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
							itemName: "Legend",
							rarity: "legendary",
						},
						equipmentSlot: "mainHand",
						price: 1,
					},
					{
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
