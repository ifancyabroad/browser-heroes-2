import { createInitialRunState, runStateSchema } from "@app/engine";
import type { RunDocument } from "../models/run.model";

export function createTestRunState() {
	return createInitialRunState({
		runId: "test-run",
		seed: "test-seed",
		heroName: "Test Hero",
		classId: "fighter",
	});
}

export function createDeadTestRunState() {
	const state = structuredClone(createTestRunState());
	state.phase = "dead";
	state.combat!.status = "enemy_won";
	state.combat!.player.currentHp = 0;
	state.hero.currentHp = 0;
	return runStateSchema.parse(state);
}

export function createTestRunDocument(
	overrides: Partial<RunDocument & { _id: unknown }> = {},
): RunDocument & { _id: unknown } {
	return {
		_id: "run-document-id",
		userId: "user-id",
		status: "active",
		state: createTestRunState(),
		summary: {},
		nextActionSequence: 1,
		createdAt: new Date("2026-01-01T00:00:00.000Z"),
		updatedAt: new Date("2026-01-02T00:00:00.000Z"),
		completedAt: null,
		...overrides,
	} as unknown as RunDocument & { _id: unknown };
}
