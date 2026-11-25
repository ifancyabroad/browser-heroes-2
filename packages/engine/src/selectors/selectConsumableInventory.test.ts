import { consumables } from "@app/content";
import { describe, expect, it } from "vitest";
import { createTestRunState } from "../test/createTestRunState";
import { selectConsumableInventory } from "./selectConsumableInventory";

describe("selectConsumableInventory", () => {
	it("projects quantities and carrying limits for every consumable", () => {
		const state = createTestRunState();
		state.hero.consumables.healingPotion = 2;
		const view = selectConsumableInventory(state.hero);
		expect(Object.keys(view).sort()).toEqual(
			consumables.map((definition) => definition.id).sort(),
		);
		for (const definition of consumables) {
			expect(view[definition.id]).toEqual({
				name: definition.name,
				quantity: state.hero.consumables[definition.id],
				maxCarry: definition.maxCarry,
			});
		}
	});
});
