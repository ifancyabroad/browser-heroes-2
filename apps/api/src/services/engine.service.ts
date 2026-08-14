import {
	applyAction,
	engineResultSchema,
	runStateSchema,
	selectEncounterContext,
	type EngineAction,
	type EngineExternalInput,
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
import { toRunSummary } from "./projection.service";
import { processRunActionAchievements } from "./achievement.service";
import { recordLifetimeProgress } from "./lifetimeProgress.service";

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

		const externalInput = await selectExternalInput({
			state: currentState,
			action: input.action,
		});

		const result = engineResultSchema.parse(
			applyAction(currentState, input.action, externalInput),
		);
		const events = result.ok ? result.events : [];

		const startedGhostId = result.ok ? getStartedGhostId(externalInput, result.state) : null;

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

		let resolvedGhostOwnerId: string | null = null;

		if (resolvedGhostOutcome) {
			const resolvedGhost = await recordGhostCombatOutcome({
				ghostId: resolvedGhostOutcome.ghostId,
				outcome: resolvedGhostOutcome.outcome,
				session,
			});
			resolvedGhostOwnerId = resolvedGhost ? String(resolvedGhost.userId) : null;
		}

		const achievementSource = {
			runId: String(run._id),
			combatId: currentState.combat?.id,
			ghostId: resolvedGhostOutcome?.ghostId,
		};

		const lifetimeProgress = await recordLifetimeProgress({
			userId: input.userId,
			classId: result.state.hero.classId,
			events,
			session,
		});

		const unlockedAchievements = await processRunActionAchievements({
			actingUserId: input.userId,
			previousState: currentState,
			nextState: result.state,
			events,
			ghostOutcome: resolvedGhostOutcome?.outcome ?? null,
			ghostOwnerId: resolvedGhostOwnerId,
			lifetimeProgress,
			source: achievementSource,
			session,
		});

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
					action: input.action,
					externalInput,
					success: result.ok,
					error: result.ok ? undefined : result.error,
				},
			],
			{ session },
		);

		return { run, result, unlockedAchievements };
	});
}

function applyStateToRun(run: RunDocument, state: RunState): void {
	run.state = state;
	run.summary = toRunSummary(state);
	run.status = deriveRunStatus(state);

	if (run.status !== "active" && !run.completedAt) {
		run.completedAt = new Date();
	}
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

async function selectExternalInput(input: {
	state: RunState;
	action: EngineAction;
}): Promise<EngineExternalInput> {
	if (input.action.type !== "ENTER_COMBAT" && input.action.type !== "CONTINUE_TO_NEXT_COMBAT") {
		return {};
	}

	const battleNumber = getBattleNumberForAction(input.state, input.action);
	const encounterContext = selectEncounterContext(battleNumber);

	if (battleNumber < FIRST_GHOST_ENCOUNTER_BATTLE) {
		return {};
	}

	if (encounterContext.encounterType !== "standard") {
		return {};
	}

	const ghostEncounter = await selectGhostEncounterForLevel({
		encounterLevel: encounterContext.ghostEncounterLevel,
	});

	if (!ghostEncounter) {
		return {};
	}

	return { ghostEncounter };
}

function getStartedGhostId(
	externalInput: EngineExternalInput,
	resultState: RunState,
): string | null {
	if (!externalInput.ghostEncounter) {
		return null;
	}

	if (
		resultState.phase !== "combat" ||
		!resultState.combat ||
		resultState.combat.encounterType !== "ghost"
	) {
		return null;
	}

	return externalInput.ghostEncounter.ghostId;
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
