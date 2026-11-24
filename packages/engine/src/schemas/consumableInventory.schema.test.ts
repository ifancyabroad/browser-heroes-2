import { describe, expect, it } from "vitest";
import { consumableInventorySchema } from "./consumableInventory.schema";
import { heroStateSchema } from "./heroState.schema";
import { runStateSchema } from "./runState.schema";
import { ghostEncounterSchema } from "./externalInput.schema";
import { createTestRunState } from "../test/createTestRunState";

describe("consumable inventory", () => {
	it("starts a current-format run with three healing potions", () => {
		const state = createTestRunState();
		expect(state.version).toBe(2);
		expect(state.hero.consumables).toEqual({ healingPotion: 3, explosivePotion: 0 });
		expect(state.hero).not.toHaveProperty("healingPotions");
	});

	it.each([0, 1, 3])("accepts %i healing potions", (quantity) => {
		expect(
			consumableInventorySchema.parse({ healingPotion: quantity, explosivePotion: 0 }),
		).toEqual({
			healingPotion: quantity,
			explosivePotion: 0,
		});
	});

	it.each([-1, 4, 1.5, NaN, Infinity, "1", null])("rejects invalid quantity %s", (quantity) => {
		expect(
			consumableInventorySchema.safeParse({ healingPotion: quantity, explosivePotion: 0 })
				.success,
		).toBe(false);
	});

	it("requires registered quantities and rejects unknown consumables", () => {
		expect(consumableInventorySchema.safeParse({}).success).toBe(false);
		expect(consumableInventorySchema.safeParse({ healingPotion: 1 }).success).toBe(false);
		expect(
			consumableInventorySchema.safeParse({
				healingPotion: 1,
				explosivePotion: 0,
				unknownPotion: 1,
			}).success,
		).toBe(false);
	});

	it.each([-1, 4, 1.5])("rejects invalid explosive potion quantity %s", (quantity) => {
		expect(
			consumableInventorySchema.safeParse({ healingPotion: 3, explosivePotion: quantity })
				.success,
		).toBe(false);
	});

	it.each([1, 3])("rejects snapshot version %i instead of converting it", (version) => {
		expect(runStateSchema.safeParse({ ...createTestRunState(), version }).success).toBe(false);
	});

	it("requires the current inventory shape for both run heroes and ghost snapshots", () => {
		const state = createTestRunState();
		const { consumables, ...hero } = state.hero;
		const oldHero = { ...hero, healingPotions: consumables.healingPotion };
		expect(heroStateSchema.safeParse(oldHero).success).toBe(false);
		expect(runStateSchema.safeParse({ ...state, hero: oldHero }).success).toBe(false);
		expect(
			ghostEncounterSchema.safeParse({
				ghostId: "ghost",
				ghostUsername: "Ghost",
				ghostSource: "player",
				hero: oldHero,
			}).success,
		).toBe(false);
	});
});
