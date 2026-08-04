import { describe, expect, it } from "vitest";
import { runStateSchema } from "../schemas";
import { createTestRunState } from "../test/createTestRunState";

describe("createInitialRunState", () => {
	it("creates the same state for identical inputs", () => {
		expect(createTestRunState()).toEqual(createTestRunState());
	});

	it("creates a valid initial combat state with the requested identity", () => {
		const state = createTestRunState();

		expect(runStateSchema.safeParse(state).success).toBe(true);
		expect(state).toMatchObject({
			id: "test-run",
			seed: "test-seed",
			phase: "combat",
			battleNumber: 1,
			hero: {
				name: "Test Hero",
				classId: "warrior",
			},
		});
		expect(state.log).toEqual([
			expect.objectContaining({
				message: "Run started for Test Hero.",
				eventType: "run_started",
			}),
		]);
	});
});
