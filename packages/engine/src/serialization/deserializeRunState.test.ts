import { describe, expect, it } from "vitest";

import { deserializeRunState, deserializeRunStateJson } from "./deserializeRunState";

describe("deserializeRunState", () => {
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
