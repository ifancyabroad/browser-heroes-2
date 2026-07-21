import type { EngineResult, EnterCombatAction, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createCombat } from "./createCombat";

export function enterCombat(state: RunState, action: EnterCombatAction): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const combatResult = createCombat({
		runId: state.id,
		hero: state.hero,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		endlessCycle: state.endlessCycle,
		rngState: state.rngState,
		ghostEncounter: action.ghostEncounter,
	});

	if (!combatResult) {
		return failureResult(state, "NO_ELIGIBLE_ENEMY");
	}

	return successResult(
		{
			...state,
			rngState: combatResult.rngState,
			phase: "combat",
			combat: combatResult.value,
			town: null,
		},
		[
			{
				type: "COMBAT_STARTED",
				combatId: combatResult.value.id,
			},
		],
	);
}
