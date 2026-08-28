import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { createTestRunState, createTestVictoryState } from "../../test/createTestRunState";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";

describe("returnToTown", () => {
	it("advances the run, resets the streak, and creates a deterministic shop", () => {
		const state = {
			...createTestVictoryState(),
			streak: 4,
		};

		const first = applyAction(state, { type: "RETURN_TO_TOWN" });
		const second = applyAction(state, { type: "RETURN_TO_TOWN" });

		expect(first).toEqual(second);
		expect(first.ok).toBe(true);
		expect(first.state).toMatchObject({
			phase: "town",
			combat: null,
			battleNumber: 2,
			zoneNumber: 1,
			endlessCycle: 0,
			streak: 0,
			town: {
				rerollCount: 0,
				shopLevel: 1,
			},
		});
		expect(first.state.town?.shopSlots.length).toBeGreaterThan(0);
		for (const slot of first.state.town?.shopSlots ?? []) {
			const item = getItemInstanceDefinition(slot.item);
			const min = Math.round((item.price * 90) / 500) * 5;
			const max = Math.round((item.price * 110) / 500) * 5;

			expect(slot.price).toBeGreaterThanOrEqual(min);
			expect(slot.price).toBeLessThanOrEqual(max);
			expect(slot.price % 5).toBe(0);
		}
		expect(first.events).toEqual([{ type: "RETURNED_TO_TOWN" }]);
	});

	it("rejects returning before victory", () => {
		const state = createTestRunState();

		expect(applyAction(state, { type: "RETURN_TO_TOWN" })).toMatchObject({
			ok: false,
			error: "INVALID_PHASE",
			state,
		});
	});

	it("restores locked slots on a later town visit", () => {
		const firstTown = createTestRunState();
		const firstVictory = {
			...firstTown,
			combat: firstTown.combat
				? { ...firstTown.combat, status: "player_won" as const }
				: null,
		};
		const enteredTown = applyAction(firstVictory, { type: "RETURN_TO_TOWN" });
		const shopSlotId = enteredTown.state.town!.shopSlots[0].id;
		const locked = applyAction(enteredTown.state, {
			type: "SET_SHOP_LOCK",
			shopSlotId,
			locked: true,
		});
		const lockedSlot = locked.state.shopLocks[0];
		const combat = applyAction(locked.state, { type: "ENTER_COMBAT" });
		const victory = {
			...combat.state,
			combat: combat.state.combat
				? { ...combat.state.combat, status: "player_won" as const }
				: null,
		};

		const returned = applyAction(victory, { type: "RETURN_TO_TOWN" });

		expect(returned.ok).toBe(true);
		expect(returned.state.town?.rerollCount).toBe(0);
		expect(returned.state.town?.shopSlots[0]).toEqual(lockedSlot);
		expect(returned.state.shopLocks).toEqual([lockedSlot]);
	});
});
