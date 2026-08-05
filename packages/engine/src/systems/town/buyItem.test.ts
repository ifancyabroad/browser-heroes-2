import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { selectAvailableActions, selectTownView } from "../../selectors";
import { createTestTownState, modifyTestRunState } from "../../test/createTestRunState";

describe("buyItem", () => {
	it("buys an available shop item through an advertised action", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100_000;
		});
		const action = selectAvailableActions(state).find(
			(candidate) => candidate.type === "BUY_ITEM",
		);

		expect(action).toBeDefined();
		if (!action || action.type !== "BUY_ITEM") {
			throw new Error("Expected an available buy action");
		}
		const price = selectTownView(state)?.shopSlots.find(
			(slot) => slot.id === action.shopSlotId,
		)?.price;

		if (price === undefined) {
			throw new Error("Expected the shop price");
		}

		const result = applyAction(state, action);

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(state.gold - price);
		expect(
			result.state.town?.shopSlots.find((slot) => slot.id === action.shopSlotId)?.purchased,
		).toBe(true);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "ITEM_BOUGHT",
				equipmentSlot: expect.any(String),
				price,
			}),
		);
	});

	it("rejects missing, purchased, and unaffordable shop slots", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100_000;
		});

		expect(applyAction(state, { type: "BUY_ITEM", shopSlotId: "missing" })).toMatchObject({
			ok: false,
			error: "SHOP_SLOT_NOT_FOUND",
		});

		const purchased = modifyTestRunState(state, (draft) => {
			draft.town!.shopSlots[0].purchased = true;
		});
		expect(
			applyAction(purchased, {
				type: "BUY_ITEM",
				shopSlotId: purchased.town!.shopSlots[0].id,
			}),
		).toMatchObject({ ok: false, error: "SHOP_SLOT_ALREADY_PURCHASED" });

		const poor = modifyTestRunState(state, (draft) => {
			draft.gold = 0;
		});
		expect(
			applyAction(poor, {
				type: "BUY_ITEM",
				shopSlotId: poor.town!.shopSlots[0].id,
			}),
		).toMatchObject({ ok: false, error: "NOT_ENOUGH_GOLD" });
	});

	it("clears a shop lock when its item is purchased", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100_000;
			draft.shopLocks = [draft.town!.shopSlots[0]];
		});
		const action = selectAvailableActions(state).find(
			(candidate) =>
				candidate.type === "BUY_ITEM" &&
				candidate.shopSlotId === state.town!.shopSlots[0].id,
		);

		expect(action).toBeDefined();
		if (!action || action.type !== "BUY_ITEM") {
			throw new Error("Expected a buy action for the locked slot");
		}

		const result = applyAction(state, action);
		expect(result.state.shopLocks).toEqual([]);
	});
});
