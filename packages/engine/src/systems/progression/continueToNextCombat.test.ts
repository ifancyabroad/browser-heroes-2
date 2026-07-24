import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	createTestRunState,
	createTestVictoryState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("continueToNextCombat", () => {
	it("advances battle state and starts a deterministic encounter", () => {
		const state = createTestVictoryState();

		const first = applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" });
		const second = applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" });

		expect(first).toEqual(second);
		expect(first.ok).toBe(true);
		expect(first.state).toMatchObject({
			phase: "combat",
			battleNumber: 2,
			zoneNumber: 1,
			streak: 1,
			town: null,
			combat: {
				status: "active",
				turnNumber: 1,
			},
		});
		expect(first.events).toEqual([
			{ type: "NEXT_COMBAT_READY" },
			expect.objectContaining({ type: "COMBAT_STARTED" }),
		]);
	});

	it("rejects continuation before victory", () => {
		const state = createTestRunState();

		expect(applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" })).toEqual({
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		});
	});

	it("blocks continuation while a level-up is pending", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.hero.pendingLevelUp = {
				level: 2,
				hpGain: 9,
				options: [],
			};
		});

		expect(applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" })).toMatchObject({
			ok: false,
			error: "LEVEL_UP_REQUIRED",
			state,
		});
	});
});
