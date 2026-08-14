import type { EngineResult, GhostEncounter, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createCombat } from "./createCombat";

export function enterCombat(state: RunState, ghostEncounter?: GhostEncounter): EngineResult {
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
		ghostEncounter,
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
