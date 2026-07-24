import { describe, expect, it } from "vitest";
import { createInitialRunState, runStateSchema } from "@app/engine";
import type { RunDocument } from "../models/run.model";
import {
	toApplyRunActionResponse,
	toRunHeroView,
	toRunSlainBy,
	toRunSummary,
	toRunView,
} from "./projection.service";

describe("projection.service", () => {
	it("projects a run summary from authoritative state", () => {
		const state = createTestState();

		expect(toRunSummary(state)).toEqual({
			heroName: "Test Hero",
			classId: "fighter",
			level: 1,
			battleNumber: 1,
			zoneNumber: 1,
			endlessCycle: 0,
			day: 1,
			kills: 0,
			hasDefeatedFinalBoss: false,
			slainBy: null,
		});
	});

	it("projects the enemy that killed a dead hero", () => {
		const state = createDeadState();

		expect(toRunSlainBy(state)).toEqual({
			sourceId: state.combat!.enemy.sourceId,
			name: state.combat!.enemy.name,
			encounterType: state.combat!.encounterType,
		});
	});

	it("only exposes completed heroes for dead or retired runs", () => {
		expect(toRunHeroView(createTestState())).toBeNull();

		const dead = createDeadState();
		expect(toRunHeroView(dead)).toMatchObject({
			hero: dead.hero,
			run: {
				status: "dead",
				battleNumber: dead.battleNumber,
				slainBy: expect.objectContaining({ name: dead.combat!.enemy.name }),
			},
		});
	});

	it("projects persisted runs with ISO timestamps", () => {
		const run = createTestRunDocument();

		expect(toRunView(run)).toMatchObject({
			id: "run-document-id",
			status: "active",
			createdAt: "2026-01-01T00:00:00.000Z",
			updatedAt: "2026-01-02T00:00:00.000Z",
			completedAt: null,
			state: run.state,
		});
	});

	it("combines the projected run and engine result", () => {
		const run = createTestRunDocument();
		const result = {
			ok: true as const,
			state: run.state,
			events: [],
		};

		expect(toApplyRunActionResponse(run, result)).toEqual({
			run: toRunView(run),
			result,
		});
	});
});

function createTestState() {
	return createInitialRunState({
		runId: "test-run",
		seed: "test-seed",
		heroName: "Test Hero",
		classId: "fighter",
	});
}

function createDeadState() {
	const state = structuredClone(createTestState());
	state.phase = "dead";
	state.combat!.status = "enemy_won";
	state.combat!.player.currentHp = 0;
	state.hero.currentHp = 0;
	return runStateSchema.parse(state);
}

function createTestRunDocument(): RunDocument & { _id: unknown } {
	return {
		_id: "run-document-id",
		userId: "user-id",
		status: "active",
		state: createTestState(),
		summary: {},
		nextActionSequence: 1,
		createdAt: new Date("2026-01-01T00:00:00.000Z"),
		updatedAt: new Date("2026-01-02T00:00:00.000Z"),
		completedAt: null,
	} as unknown as RunDocument & { _id: unknown };
}
