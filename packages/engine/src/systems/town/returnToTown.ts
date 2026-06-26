import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";

export function returnToTown(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	return successResult(
		{
			...state,
			phase: "town",
			combat: null,
			battleNumber: state.battleNumber + 1,
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
