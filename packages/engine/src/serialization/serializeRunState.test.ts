import { describe, expect, it } from "vitest";

import { applyAction } from "../actions";
import { createTestRunState } from "../test/createTestRunState";
import { deserializeRunStateJson } from "./deserializeRunState";
import { serializeRunState } from "./serializeRunState";

describe("serializeRunState", () => {
	it("round trips a valid initial state", () => {
		const state = createTestRunState();

		expect(deserializeRunStateJson(serializeRunState(state))).toEqual({
			ok: true,
			state,
		});
	});

	it("round trips a state after an action", () => {
		const result = applyAction(createTestRunState(), { type: "PLAYER_SKIP_TURN" });

		expect(result.ok).toBe(true);
		expect(deserializeRunStateJson(serializeRunState(result.state))).toEqual({
			ok: true,
			state: result.state,
		});
	});
});
