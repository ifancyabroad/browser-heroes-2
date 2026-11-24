import { describe, expect, it } from "vitest";
import { createTestCombatState, createTestTownState } from "../test/createTestRunState";
import { selectConsumableInventory } from "./selectConsumableInventory";
import { selectHeroView } from "./selectHeroView";
import { selectCombatView } from "./selectCombatView";
import { selectTownView } from "./selectTownView";
import { selectAvailableActions } from "./selectAvailableActions";

describe("consumable projections", () => {
	it("projects quantities and carrying limits consistently for inventory, hero, and combat views", () => {
		const state = createTestCombatState();
		state.hero.consumables.healingPotion = 2;
		const expected = { healingPotion: { name: "Healing Potion", quantity: 2, maxCarry: 3 } };
		expect(selectConsumableInventory(state.hero)).toEqual(expected);
		expect(selectHeroView(state.hero).consumables).toEqual(expected);
		expect(selectCombatView(state)!.consumables).toEqual(expected);
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
			expect(
				selectAvailableActions(state).some(
					(action) =>
						action.type === "BUY_CONSUMABLE" &&
						action.consumableType === "healingPotion",
				),
			).toBe(canBuy);
		},
	);
});
