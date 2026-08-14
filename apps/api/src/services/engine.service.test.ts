import mongoose from "mongoose";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createDeadTestRunState,
	createTestRunDocument,
	createTestRunState,
} from "../test/createTestRun";

const models = vi.hoisted(() => ({
	run: { findOne: vi.fn() },
	action: { create: vi.fn() },
}));
const engine = vi.hoisted(() => ({
	applyAction: vi.fn(),
}));
const ghostService = vi.hoisted(() => ({
	createGhostFromRunIfEligible: vi.fn(),
	incrementGhostEncounters: vi.fn(),
	recordGhostCombatOutcome: vi.fn(),
	selectGhostEncounterForLevel: vi.fn(),
}));

vi.mock("../models/run.model", () => ({ RunModel: models.run }));
vi.mock("../models/runAction.model", () => ({ RunActionModel: models.action }));
vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	applyAction: engine.applyAction,
}));
vi.mock("./ghost.service", () => ghostService);

import { applyRunAction } from "./engine.service";

describe("engine.service", () => {
	const session = { id: "session" };

	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(mongoose.connection, "transaction").mockImplementation(async (callback) =>
			callback(session as never),
		);
		models.action.create.mockResolvedValue([]);
	});

	function arrangeRun(overrides = {}) {
		const run = {
			...createTestRunDocument(),
			save: vi.fn().mockResolvedValue(undefined),
			...overrides,
		};
		const sessionQuery = vi.fn().mockResolvedValue(run);
		models.run.findOne.mockReturnValue({ session: sessionQuery });
		return { run, sessionQuery };
	}

	it("loads an active run by id and owner inside the transaction", async () => {
		const { run, sessionQuery } = arrangeRun();
		engine.applyAction.mockReturnValue({
			ok: true,
			state: run.state,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(models.run.findOne).toHaveBeenCalledWith({
			_id: "run-id",
			userId: "user-id",
			status: "active",
		});
		expect(sessionQuery).toHaveBeenCalledWith(session);
	});

	it("rejects missing or unowned active runs", async () => {
		models.run.findOne.mockReturnValue({
			session: vi.fn().mockResolvedValue(null),
		});

		await expect(
			applyRunAction({
				userId: "user-id",
				runId: "run-id",
				action: { type: "PLAYER_SKIP_TURN" },
			}),
		).rejects.toThrow("RUN_NOT_FOUND");

		expect(engine.applyAction).not.toHaveBeenCalled();
		expect(models.action.create).not.toHaveBeenCalled();
	});

	it("persists successful state transitions and action history", async () => {
		const nextState = structuredClone(createTestRunState());
		nextState.kills = 2;
		const { run } = arrangeRun({ nextActionSequence: 4 });
		engine.applyAction.mockReturnValue({ ok: true, state: nextState, events: [] });

		const response = await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(run.state).toEqual(nextState);
		expect(run.summary).toMatchObject({ kills: 2 });
		expect(run.status).toBe("active");
		expect(run.nextActionSequence).toBe(5);
		expect(run.save).toHaveBeenCalledWith({ session });
		expect(models.action.create).toHaveBeenCalledWith(
			[
				{
					runId: "run-document-id",
					userId: "user-id",
					sequence: 4,
					action: { type: "PLAYER_SKIP_TURN" },
					externalInput: {},
					success: true,
					error: undefined,
				},
			],
			{ session },
		);
		expect(response).toEqual({
			run,
			result: { ok: true, state: nextState, events: [] },
			unlockedAchievements: [],
		});
	});

	it("persists failed engine attempts with their error code", async () => {
		const state = createTestRunState();
		const { run } = arrangeRun();
		engine.applyAction.mockReturnValue({
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(run.nextActionSequence).toBe(2);
		expect(models.action.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					success: false,
					error: "INVALID_PHASE",
				}),
			],
			{ session },
		);
	});

	it("completes dead runs and creates an eligible ghost", async () => {
		const deadState = createDeadTestRunState();
		const { run } = arrangeRun();
		engine.applyAction.mockReturnValue({
			ok: true,
			state: deadState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(run.status).toBe("dead");
		expect(run.completedAt).toBeInstanceOf(Date);
		expect(ghostService.createGhostFromRunIfEligible).toHaveBeenCalledWith({
			userId: "user-id",
			runId: "run-document-id",
			state: deadState,
			session,
		});
	});

	it("marks retired runs complete without creating a ghost", async () => {
		const retiredState = structuredClone(createTestRunState());
		retiredState.phase = "retired";
		const { run } = arrangeRun();
		engine.applyAction.mockReturnValue({
			ok: true,
			state: retiredState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "RETIRE_RUN" },
		});

		expect(run.status).toBe("retired");
		expect(run.completedAt).toBeInstanceOf(Date);
		expect(ghostService.createGhostFromRunIfEligible).not.toHaveBeenCalled();
	});

	it("preserves an existing completion timestamp", async () => {
		const completedAt = new Date("2026-01-01T00:00:00.000Z");
		const deadState = createDeadTestRunState();
		const { run } = arrangeRun({ completedAt });
		engine.applyAction.mockReturnValue({
			ok: true,
			state: deadState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(run.completedAt).toBe(completedAt);
	});

	it("adds an eligible selected ghost to combat and increments its encounters", async () => {
		const state = createTestRunState();
		state.battleNumber = 11;
		const resultState = structuredClone(state);
		resultState.phase = "combat";
		resultState.combat!.encounterType = "ghost";
		resultState.combat!.enemy.sourceId = "ghost-id";
		const ghostEncounter = {
			ghostId: "ghost-id",
			ghostUsername: "Ghost Owner",
			hero: structuredClone(state.hero),
		};
		const { run } = arrangeRun({ state });
		ghostService.selectGhostEncounterForLevel.mockResolvedValue(ghostEncounter);
		engine.applyAction.mockReturnValue({
			ok: true,
			state: resultState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "ENTER_COMBAT" },
		});

		expect(ghostService.selectGhostEncounterForLevel).toHaveBeenCalledWith({
			encounterLevel: expect.any(Number),
		});
		expect(engine.applyAction).toHaveBeenCalledWith(
			state,
			{ type: "ENTER_COMBAT" },
			{ ghostEncounter },
		);
		expect(ghostService.incrementGhostEncounters).toHaveBeenCalledWith({
			ghostId: "ghost-id",
			session,
		});
		expect(models.action.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					action: { type: "ENTER_COMBAT" },
					externalInput: { ghostEncounter },
				}),
			],
			{ session },
		);
		expect(run.nextActionSequence).toBe(2);
	});

	it.each([
		["enemy_won", "ghost_won"],
		["player_won", "ghost_lost"],
	] as const)("records a resolved ghost %s outcome", async (combatStatus, outcome) => {
		const previousState = createTestRunState();
		previousState.combat!.encounterType = "ghost";
		previousState.combat!.enemy.sourceId = "ghost-id";
		previousState.combat!.status = "active";
		const resultState = structuredClone(previousState);
		resultState.combat!.status = combatStatus;
		arrangeRun({ state: previousState });
		engine.applyAction.mockReturnValue({
			ok: true,
			state: resultState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(ghostService.recordGhostCombatOutcome).toHaveBeenCalledWith({
			ghostId: "ghost-id",
			outcome,
			session,
		});
	});

	it("does not record unresolved ghost combat", async () => {
		const state = createTestRunState();
		state.combat!.encounterType = "ghost";
		state.combat!.enemy.sourceId = "ghost-id";
		const resultState = structuredClone(state);
		arrangeRun({ state });
		engine.applyAction.mockReturnValue({
			ok: true,
			state: resultState,
			events: [],
		});

		await applyRunAction({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(ghostService.recordGhostCombatOutcome).not.toHaveBeenCalled();
	});
});
