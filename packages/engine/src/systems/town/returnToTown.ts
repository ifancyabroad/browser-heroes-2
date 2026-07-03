import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";

export function returnToTown(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	const battleNumber = state.battleNumber + 1;

	return successResult(
		{
			...state,
			phase: "town",
			combat: null,
			battleNumber,
			zoneNumber: getZoneNumberForBattle(battleNumber),
			streak: 0,
			town: createTownState(),
		},
		[
			{
				type: "RETURNED_TO_TOWN",
			},
		],
	);
}

function createTownState(): RunState["town"] {
	return {
		shopSlots: [],
		rerollCost: 5,
	};
}
