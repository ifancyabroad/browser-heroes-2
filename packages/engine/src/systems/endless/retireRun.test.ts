import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	createTestRunState,
	createTestVictoryState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("retireRun", () => {
	it("retires after final-boss victory", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.battleNumber = 100;
		});

		expect(applyAction(state, { type: "RETIRE_RUN" })).toMatchObject({
			ok: true,
			state: { phase: "retired" },
			events: [{ type: "RUN_RETIRED" }],
		});
	});

	it("rejects retirement before final-boss victory", () => {
		for (const state of [createTestRunState(), createTestVictoryState()]) {
			expect(applyAction(state, { type: "RETIRE_RUN" })).toMatchObject({
				ok: false,
				error: "INVALID_PHASE",
			});
		}
	});
});
