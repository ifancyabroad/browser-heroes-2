import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { validateAction } from "../../actions/validateAction";
import { selectTownView } from "../../selectors/selectTownView";
import { createTestTownState, modifyTestRunState } from "../../test/createTestRunState";

describe("buyConsumable (healing potion)", () => {
	it("requires an explicit purchase quantity", () => {
		expect(validateAction({ type: "BUY_CONSUMABLE", consumableType: "healingPotion" }).ok).toBe(
			false,
		);
	});
	it("buys a full batch at the combined price", () => {
		const state = createTestTownState();
		state.gold = 1000;
		state.hero.consumables.healingPotion = 0;
		// The starting warrior pays 19 gold per potion in zone 1: three cost 57.
		const result = applyAction(state, {
			type: "BUY_CONSUMABLE",
			consumableType: "healingPotion",
			quantity: 3,
		});
		expect(result.ok).toBe(true);
		expect(result.state.hero.consumables.healingPotion).toBe(3);
		expect(result.state.gold).toBe(943);
		expect(result.events).toContainEqual({
			type: "HEALING_POTION_BOUGHT",
			quantity: 3,
			cost: 57,
			remainingPotions: 3,
		});
	});

	it.each([0, -1, 1.5, NaN, Infinity])("rejects invalid quantity %s", (quantity) => {
		const state = createTestTownState();
		const action = {
			type: "BUY_CONSUMABLE" as const,
			consumableType: "healingPotion" as const,
			quantity,
		};
		expect(validateAction(action).ok).toBe(false);
		expect(applyAction(state, action)).toMatchObject({
			ok: false,
			error: "INVALID_ACTION",
			state,
		});
	});

	it("rejects a batch exceeding capacity without changing state", () => {
		const state = createTestTownState();
		state.hero.consumables.healingPotion = 2;
		state.gold = 1000;
		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
				quantity: 2,
			}),
		).toMatchObject({ ok: false, error: "HEALING_POTIONS_FULL", state });
	});

	it("rejects an unaffordable refill even when one potion is affordable", () => {
		const state = createTestTownState();
		state.hero.consumables.healingPotion = 0;
		state.gold = selectTownView(state)!.consumables.healingPotion.price;
		expect(selectTownView(state)).toMatchObject({
			consumables: { healingPotion: { canBuy: true } },
		});
		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
				quantity: 3,
			}),
		).toMatchObject({ ok: false, error: "NOT_ENOUGH_GOLD", state });
	});
	it("charges gold and adds one potion", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.consumables.healingPotion = 1;
		});

		const result = applyAction(state, {
			type: "BUY_CONSUMABLE",
			consumableType: "healingPotion",
			quantity: 1,
		});

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBeLessThan(state.gold);
		expect(result.state.hero.consumables.healingPotion).toBe(2);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "HEALING_POTION_BOUGHT",
				quantity: 1,
				remainingPotions: 2,
			}),
		);
	});

	it("rejects buying at the inventory limit", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.consumables.healingPotion = 3;
		});

		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
				quantity: 1,
			}),
		).toMatchObject({ ok: false, error: "HEALING_POTIONS_FULL", state });
	});

	it("continues scaling the price after the first zone cycle", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.battleNumber = 101;
			draft.zoneNumber = 11;
			draft.endlessCycle = 1;
			draft.gold = 1_000;
			draft.hero.consumables.healingPotion = 0;
		});

		const result = applyAction(state, {
			type: "BUY_CONSUMABLE",
			consumableType: "healingPotion",
			quantity: 1,
		});

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(795);
		expect(result.events).toContainEqual({
			type: "HEALING_POTION_BOUGHT",
			quantity: 1,
			cost: 205,
			remainingPotions: 1,
		});
	});

	it("rejects buying without enough gold", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
			draft.hero.consumables.healingPotion = 0;
		});

		expect(
			applyAction(state, {
				type: "BUY_CONSUMABLE",
				consumableType: "healingPotion",
				quantity: 1,
			}),
		).toMatchObject({ ok: false, error: "NOT_ENOUGH_GOLD", state });
	});
});
