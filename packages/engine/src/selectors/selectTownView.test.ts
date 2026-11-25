import { describe, expect, it } from "vitest";
import { createTestTownState } from "../test/createTestRunState";
import { selectTownView } from "./selectTownView";

describe("selectTownView", () => {
	it("prevents potion purchases when full even when they are affordable", () => {
		const state = createTestTownState();
		state.hero.consumables.healingPotion = 3;
		state.gold = 1000;
		expect(selectTownView(state)).toMatchObject({
			consumables: { healingPotion: { canAfford: true, canBuy: false } },
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

	it.each([
		{ quantity: 0, gold: 0, canAfford: false, canBuy: false },
		{ quantity: 0, gold: 1000, canAfford: true, canBuy: true },
		{ quantity: 3, gold: 1000, canAfford: true, canBuy: false },
	])(
		"projects town availability with $quantity potions and $gold gold",
		({ quantity, gold, canAfford, canBuy }) => {
			const state = createTestTownState();
			state.hero.consumables.healingPotion = quantity;
			state.gold = gold;
			expect(selectTownView(state)!.consumables.healingPotion).toEqual({
				name: "Healing Potion",
				quantity,
				maxCarry: 3,
				price: 19,
				canAfford,
				canBuy,
			});
		},
	);

	it.each([
		{ consumableType: "explosivePotion", name: "Explosive Potion", maxCarry: 3, price: 9 },
		{ consumableType: "speedPotion", name: "Potion of Speed", maxCarry: 2, price: 28 },
	] as const)(
		"projects the price and carrying limit for $consumableType",
		({ consumableType, name, maxCarry, price }) => {
			const state = createTestTownState();
			state.gold = 100;
			expect(selectTownView(state)!.consumables[consumableType]).toEqual({
				name,
				quantity: 0,
				maxCarry,
				price,
				canAfford: true,
				canBuy: true,
			});
			state.hero.consumables[consumableType] = maxCarry;
			expect(selectTownView(state)!.consumables[consumableType].canBuy).toBe(false);
		},
	);
});
