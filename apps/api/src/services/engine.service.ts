import {
	applyAction,
	engineResultSchema,
	runStateSchema,
	type EngineAction,
	type RunState,
} from "@app/engine";
import { RunActionModel } from "../models/runAction.model";
import { RunModel, type RunDocument } from "../models/run.model";
import mongoose from "mongoose";
import {
	createGhostFromRunIfEligible,
	incrementGhostEncounters,
	recordGhostCombatOutcome,
	selectGhostEncounterForLevel,
} from "./ghost.service";
import { getEncounterTypeForBattle } from "packages/engine/dist/systems/encounters/getEncounterTypeForBattle";

const FIRST_GHOST_ENCOUNTER_BATTLE = 11;

export type ApplyRunActionInput = {
	userId: string;
	runId: string;
	action: EngineAction;
};

export async function applyRunAction(input: ApplyRunActionInput) {
	return mongoose.connection.transaction(async (session) => {
		const run = await RunModel.findOne({
			_id: input.runId,
			userId: input.userId,
			status: "active",
		}).session(session);

		if (!run) {
			throw new Error("RUN_NOT_FOUND");
		}

		const currentState = runStateSchema.parse(run.state);

		const action = await prepareActionForEngine({
			userId: input.userId,
			state: currentState,
			action: input.action,
		});

		const result = engineResultSchema.parse(applyAction(currentState, action));

		const startedGhostId = result.ok ? getStartedGhostId(action, result.state) : null;

		const resolvedGhostOutcome = result.ok
			? getResolvedGhostOutcome(currentState, result.state)
			: null;

		const sequence = run.nextActionSequence;

		applyStateToRun(run, result.state);
		run.nextActionSequence += 1;

		await run.save({ session });

		if (startedGhostId) {
			await incrementGhostEncounters({
				ghostId: startedGhostId,
				session,
			});
		}

		if (resolvedGhostOutcome) {
			await recordGhostCombatOutcome({
				ghostId: resolvedGhostOutcome.ghostId,
				outcome: resolvedGhostOutcome.outcome,
				session,
			});
		}

		if (run.status === "dead") {
			await createGhostFromRunIfEligible({
				userId: input.userId,
				runId: run._id,
				state: result.state,
				session,
			});
		}

		await RunActionModel.create(
			[
				{
					runId: run._id,
					userId: input.userId,
					sequence,
					action,
					success: result.ok,
					error: result.ok ? undefined : result.error,
				},
			],
			{ session },
		);

		return { run, result };
	});
}

function applyStateToRun(run: RunDocument, state: RunState): void {
	run.state = state;
	run.summary = deriveRunSummary(state);
	run.status = deriveRunStatus(state);

	if (run.status !== "active" && !run.completedAt) {
		run.completedAt = new Date();
	}
}

function deriveRunSummary(state: RunState) {
	return {
		heroName: state.hero.name,
		classId: state.hero.classId,
		level: state.hero.level,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
	};
}

function deriveRunStatus(state: RunState): "active" | "dead" | "retired" {
	switch (state.phase) {
		case "dead":
			return "dead";

		case "retired":
			return "retired";

		default:
			return "active";
	}
}

async function prepareActionForEngine(input: {
	userId: string;
	state: RunState;
	action: EngineAction;
}): Promise<EngineAction> {
	if (input.action.type !== "ENTER_COMBAT" && input.action.type !== "CONTINUE_TO_NEXT_COMBAT") {
		return input.action;
	}

	if (input.action.ghostEncounter) {
		return input.action;
	}

	const battleNumber = getBattleNumberForAction(input.state, input.action);

	if (battleNumber < FIRST_GHOST_ENCOUNTER_BATTLE) {
		return input.action;
	}

	if (getEncounterTypeForBattle(battleNumber) !== "standard") {
		return input.action;
	}

	const ghostEncounter = await selectGhostEncounterForLevel({
		encounterLevel: getGhostEncounterLevelForRunState(input.state),
		excludeUserId: input.userId,
	});

	if (!ghostEncounter) {
		return input.action;
	}

	return {
		...input.action,
		ghostEncounter,
	};
}

function getGhostEncounterLevelForRunState(state: RunState): number {
	if (state.endlessCycle > 0) {
		return 10;
	}

	return Math.min(state.zoneNumber, 10);
}

function getStartedGhostId(action: EngineAction, resultState: RunState): string | null {
	if (action.type !== "ENTER_COMBAT" && action.type !== "CONTINUE_TO_NEXT_COMBAT") {
		return null;
	}

	if (!action.ghostEncounter) {
		return null;
	}

	if (
		resultState.phase !== "combat" ||
		!resultState.combat ||
		resultState.combat.encounterType !== "ghost"
	) {
		return null;
	}

	return action.ghostEncounter.ghostId;
}

function getResolvedGhostOutcome(
	previousState: RunState,
	resultState: RunState,
): { ghostId: string; outcome: "ghost_won" | "ghost_lost" } | null {
	const previousCombat = previousState.combat;
	const resultCombat = resultState.combat;

	if (
		previousState.phase !== "combat" ||
		!previousCombat ||
		previousCombat.encounterType !== "ghost" ||
		previousCombat.status !== "active"
	) {
		return null;
	}

	if (!resultCombat || resultCombat.id !== previousCombat.id) {
		return null;
	}

	if (resultCombat.status === "enemy_won") {
		return {
			ghostId: previousCombat.enemy.sourceId,
			outcome: "ghost_won",
		};
	}

	if (resultCombat.status === "player_won") {
		return {
			ghostId: previousCombat.enemy.sourceId,
			outcome: "ghost_lost",
		};
	}

	return null;
}

function getBattleNumberForAction(state: RunState, action: EngineAction): number {
	if (action.type === "CONTINUE_TO_NEXT_COMBAT") {
		return state.battleNumber + 1;
	}

	return state.battleNumber;
}
