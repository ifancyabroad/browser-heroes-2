import { describe, expect, it } from "vitest";
import { applyAction } from "../actions";
import { createTestRunState } from "../test/createTestRunState";
import { deserializeRunState, deserializeRunStateJson, serializeRunState } from "./index";

describe("run state serialization", () => {
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

	it("returns a structured failure for invalid state", () => {
		const result = deserializeRunState({ version: 1 });

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toBeTruthy();
		}
	});

	it("returns a stable failure for invalid JSON", () => {
		expect(deserializeRunStateJson("{")).toEqual({
			ok: false,
			error: "Invalid JSON",
		});
	});
});
