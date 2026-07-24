import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { createTestRunState, createTestVictoryState } from "../../test/createTestRunState";

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
			streak: 0,
			town: {
				rerollCount: 0,
				shopLevel: 1,
			},
		});
		expect(first.state.town?.shopSlots.length).toBeGreaterThan(0);
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
});
