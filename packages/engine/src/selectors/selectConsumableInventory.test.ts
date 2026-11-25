import { describe, expect, it } from "vitest";
import { createTestRunState } from "../test/createTestRunState";
import { selectConsumableInventory } from "./selectConsumableInventory";
describe("selectConsumableInventory", () => {
	it("projects quantities and carrying limits for every consumable", () => {
		const state = createTestRunState();
		state.hero.consumables.healingPotion = 2;
		const expected = {
			healingPotion: { name: "Healing Potion", quantity: 2, maxCarry: 3 },
			explosivePotion: { name: "Explosive Potion", quantity: 0, maxCarry: 3 },
			speedPotion: { name: "Potion of Speed", quantity: 0, maxCarry: 2 },
		};
		expect(selectConsumableInventory(state.hero)).toEqual(expected);
	});
});
