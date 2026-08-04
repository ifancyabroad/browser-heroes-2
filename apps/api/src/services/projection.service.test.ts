import { describe, expect, it } from "vitest";
import {
	createDeadTestRunState,
	createTestRunDocument,
	createTestRunState,
} from "../test/createTestRun";
import {
	toApplyRunActionResponse,
	toRunHeroView,
	toRunSlainBy,
	toRunSummary,
	toRunView,
} from "./projection.service";

describe("projection.service", () => {
	it("projects a run summary from authoritative state", () => {
		const state = createTestRunState();

		expect(toRunSummary(state)).toEqual({
			heroName: "Test Hero",
			classId: "warrior",
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
		const state = createDeadTestRunState();

		expect(toRunSlainBy(state)).toEqual({
			sourceId: state.combat!.enemy.sourceId,
			name: state.combat!.enemy.name,
			encounterType: state.combat!.encounterType,
		});
	});

	it("only exposes completed heroes for dead or retired runs", () => {
		expect(toRunHeroView(createTestRunState())).toBeNull();

		const dead = createDeadTestRunState();
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
			unlockedAchievements: [],
		});
	});
});
