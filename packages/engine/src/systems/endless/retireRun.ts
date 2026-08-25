import type { EngineResult, RunState } from "../../schemas";
import { failureResult, successResult } from "../../core/result";
import { isFinalBossVictory } from "../endless/endlessProgression";

export function retireRun(state: RunState): EngineResult {
	if (
		state.phase !== "combat" ||
		!state.combat ||
		state.combat.status !== "player_won" ||
		!isFinalBossVictory(state.battleNumber)
	) {
		return failureResult(state, "INVALID_PHASE");
	}

	return successResult(
		{
			...state,
			phase: "retired",
		},
		[{ type: "RUN_RETIRED" }],
	);
}
