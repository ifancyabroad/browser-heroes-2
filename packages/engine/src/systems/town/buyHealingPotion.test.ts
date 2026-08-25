import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { createTestTownState, modifyTestRunState } from "../../test/createTestRunState";

describe("buyHealingPotion", () => {
	it("charges gold and adds one potion", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.healingPotions = 1;
		});

		const result = applyAction(state, {
			type: "BUY_CONSUMABLE",
			consumableType: "healingPotion",
		});

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBeLessThan(state.gold);
		expect(result.state.hero.healingPotions).toBe(2);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "HEALING_POTION_BOUGHT",
				remainingPotions: 2,
			}),
		);
	});

	it("rejects buying at the inventory limit", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.healingPotions = 3;
		});

		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "HEALING_POTIONS_FULL", state });
	});

	it("continues scaling the price after the first zone cycle", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.battleNumber = 101;
			draft.zoneNumber = 11;
			draft.endlessCycle = 1;
			draft.gold = 1_000;
			draft.hero.healingPotions = 0;
		});

		const result = applyAction(state, {
			type: "BUY_CONSUMABLE",
			consumableType: "healingPotion",
		});

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(795);
		expect(result.events).toContainEqual({
			type: "HEALING_POTION_BOUGHT",
			cost: 205,
			remainingPotions: 1,
		});
	});

	it("rejects buying without enough gold", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
			draft.hero.healingPotions = 0;
		});

		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "NOT_ENOUGH_GOLD", state });
	});
});
