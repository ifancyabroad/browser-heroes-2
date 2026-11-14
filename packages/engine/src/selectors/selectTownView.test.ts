import { describe, expect, it } from "vitest";
import { createTestTownState } from "../test/createTestRunState";
import { selectTownView } from "./selectTownView";

describe("selectTownView", () => {
	it("separates refill affordability from carrying capacity", () => {
		const state = createTestTownState();
		state.hero.healingPotions = 3;
		state.gold = 0;
		expect(selectTownView(state)).toMatchObject({
			healingPotionRefillQuantity: 0,
			healingPotionRefillCost: 0,
			canAffordHealingPotionRefill: true,
			canBuyHealingPotion: false,
		});
	});

	it.each([
		[2, 2],
		[9, 9],
		[10, 10],
		[11, 1],
		[100, 10],
		[101, 1],
		[110, 10],
	])("projects battle %i as zone battle %i", (battleNumber, zoneBattleNumber) => {
		const state = createTestTownState();
		state.battleNumber = battleNumber;
		state.zoneNumber = Math.ceil(battleNumber / 10);
		state.endlessCycle = Math.floor((battleNumber - 1) / 100);

		expect(selectTownView(state)).toMatchObject({
			battleNumber,
			zoneBattleNumber,
			battlesPerZone: 10,
		});
	});
});
