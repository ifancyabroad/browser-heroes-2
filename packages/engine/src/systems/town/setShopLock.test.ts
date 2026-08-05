import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { selectAvailableActions, selectTownView } from "../../selectors";
import {
	createTestRunState,
	createTestTownState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("setShopLock", () => {
	it("locks and unlocks an advertised shop slot", () => {
		const state = createTestTownState();
		const action = selectAvailableActions(state).find(
			(candidate) => candidate.type === "SET_SHOP_LOCK",
		);

		expect(action).toBeDefined();
		if (!action || action.type !== "SET_SHOP_LOCK") {
			throw new Error("Expected an available shop lock action");
		}

		const locked = applyAction(state, action);

		expect(locked.ok).toBe(true);
		expect(locked.state.shopLocks).toContainEqual(
			state.town?.shopSlots.find((slot) => slot.id === action.shopSlotId),
		);
		expect(selectTownView(locked.state)?.shopSlots[0].locked).toBe(true);
		expect(locked.events).toEqual([
			{
				type: "SHOP_LOCK_CHANGED",
				shopSlotId: action.shopSlotId,
				locked: true,
			},
		]);

		const unlocked = applyAction(locked.state, { ...action, locked: false });
		expect(unlocked.state.shopLocks).toEqual([]);
	});

	it("treats setting the current lock state as an idempotent success", () => {
		const state = createTestTownState();
		const shopSlotId = state.town!.shopSlots[0].id;

		const result = applyAction(state, {
			type: "SET_SHOP_LOCK",
			shopSlotId,
			locked: false,
		});

		expect(result).toEqual({ ok: true, state, events: [] });
	});

	it("rejects invalid phases, missing slots, and purchased slots", () => {
		expect(
			applyAction(createTestRunState(), {
				type: "SET_SHOP_LOCK",
				shopSlotId: "missing",
				locked: true,
			}),
		).toMatchObject({ ok: false, error: "TOWN_NOT_AVAILABLE" });

		const state = createTestTownState();
		expect(
			applyAction(state, {
				type: "SET_SHOP_LOCK",
				shopSlotId: "missing",
				locked: true,
			}),
		).toMatchObject({ ok: false, error: "SHOP_SLOT_NOT_FOUND" });

		const purchased = modifyTestRunState(state, (draft) => {
			draft.town!.shopSlots[0].purchased = true;
		});
		expect(
			applyAction(purchased, {
				type: "SET_SHOP_LOCK",
				shopSlotId: purchased.town!.shopSlots[0].id,
				locked: true,
			}),
		).toMatchObject({ ok: false, error: "SHOP_SLOT_ALREADY_PURCHASED" });
	});
});
