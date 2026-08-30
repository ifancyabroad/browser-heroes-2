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
	selectGhostEncounter,
} from "./ghost.service";
import { toRunSummary } from "./projection.service";
import { processRunActionAchievements, type AchievementSource } from "./achievement.service";
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
			ghostPoolCutoff: getGhostPoolCutoff(run),
			defeatedGhostIds: run.defeatedGhostIds,
		});

		const result = engineResultSchema.parse(
			applyAction(currentState, input.action, externalInput),
		);
		const events = result.ok ? result.events : [];

		const startedPlayerGhostId = result.ok
			? getStartedPlayerGhostId(externalInput, result.state)
			: null;

		const resolvedGhostOutcome = result.ok
			? getResolvedGhostOutcome(currentState, result.state)
			: null;
		const resolvedPlayerGhost =
			resolvedGhostOutcome?.ghostSource === "player" ? resolvedGhostOutcome : null;

		const sequence = run.nextActionSequence;
		if (resolvedGhostOutcome?.outcome === "ghost_lost") {
			addDefeatedGhostId(run.defeatedGhostIds, resolvedGhostOutcome.ghostId);
		}

		applyStateToRun(run, result.state);
		run.nextActionSequence += 1;

		await run.save({ session });

		if (startedPlayerGhostId) {
			await incrementGhostEncounters({
				ghostId: startedPlayerGhostId,
				session,
			});
		}

		let resolvedGhostOwnerId: string | null = null;

		if (resolvedPlayerGhost) {
			const ghost = await recordGhostCombatOutcome({
				ghostId: resolvedPlayerGhost.ghostId,
				outcome: resolvedPlayerGhost.outcome,
				banishedBy: {
					sourceId: String(run._id),
					heroName: result.state.hero.name,
					classId: result.state.hero.classId,
					heroLevel: result.state.hero.level,
				},
				session,
			});
			resolvedGhostOwnerId = ghost ? String(ghost.userId) : null;
		}

		const lifetimeProgress = await recordLifetimeProgress({
			userId: input.userId,
			classId: result.state.hero.classId,
			events,
			session,
		});

		const achievementSource: AchievementSource = {
			runId: String(run._id),
			combatId: currentState.combat?.id,
		};

		if (resolvedPlayerGhost) {
			achievementSource.ghostId = resolvedPlayerGhost.ghostId;
		}

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
					events,
					success: result.ok,
					error: result.ok ? undefined : result.error,
				},
			],
			{ session },
		);

		return { run, result, unlockedAchievements };
	});
}

function getGhostPoolCutoff(run: RunDocument): Date {
	if (run.mode === "normal") {
		return run.createdAt;
	}

	if (!run.dailyChallengeDate) {
		throw new Error("DAILY_CHALLENGE_METADATA_MISSING");
	}

	return new Date(`${run.dailyChallengeDate}T00:00:00.000Z`);
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
	ghostPoolCutoff: Date;
	defeatedGhostIds: string[];
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

	const ghostEncounter = await selectGhostEncounter({
		encounterLevel: encounterContext.ghostEncounterLevel,
		seed: input.state.seed,
		battleNumber,
		ghostPoolCutoff: input.ghostPoolCutoff,
		defeatedGhostIds: input.defeatedGhostIds,
	});

	if (!ghostEncounter) {
		return {};
	}

	return { ghostEncounter };
}

function addDefeatedGhostId(defeatedGhostIds: string[], ghostId: string): void {
	if (!defeatedGhostIds.includes(ghostId)) {
		defeatedGhostIds.push(ghostId);
	}
}

function getStartedPlayerGhostId(
	externalInput: EngineExternalInput,
	resultState: RunState,
): string | null {
	const encounter = externalInput.ghostEncounter;
	if (
		!encounter ||
		encounter.ghostSource !== "player" ||
		resultState.phase !== "combat" ||
		resultState.combat?.encounterType !== "ghost"
	) {
		return null;
	}

	return encounter.ghostId;
}

type ResolvedGhostOutcome = {
	ghostId: string;
	ghostSource: "player" | "system";
	outcome: "ghost_won" | "ghost_lost";
};

function getResolvedGhostOutcome(
	previousState: RunState,
	resultState: RunState,
): ResolvedGhostOutcome | null {
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

	if (!previousCombat.ghostSource) {
		throw new Error("GHOST_SOURCE_MISSING");
	}

	if (resultCombat.status === "enemy_won") {
		return {
			ghostId: previousCombat.enemy.sourceId,
			ghostSource: previousCombat.ghostSource,
			outcome: "ghost_won",
		};
	}

	if (resultCombat.status === "player_won") {
		return {
			ghostId: previousCombat.enemy.sourceId,
			ghostSource: previousCombat.ghostSource,
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
