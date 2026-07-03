import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { enterCombat } from "../combat/enterCombat";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";

export function continueToNextCombat(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	const battleNumber = state.battleNumber + 1;

	const readyState: RunState = {
		...state,
		phase: "town",
		combat: null,
		battleNumber,
		zoneNumber: getZoneNumberForBattle(battleNumber),
		streak: state.streak + 1,
	};

	const enterResult = enterCombat(readyState);

	if (!enterResult.ok) {
		return enterResult;
	}

	return successResult(enterResult.state, [
		{
			type: "NEXT_COMBAT_READY",
		},
		...enterResult.events,
	]);
}
