import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";
import { createInitialTownState } from "../../state";

export function returnToTown(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.hero.pendingLevelUp) {
		return failureResult(state, "LEVEL_UP_REQUIRED");
	}

	if (state.pendingRewardChoice) {
		return failureResult(state, "REWARD_SELECTION_REQUIRED");
	}

	const battleNumber = state.battleNumber + 1;
	const zoneNumber = getZoneNumberForBattle(battleNumber);

	const town = createInitialTownState({
		runId: state.id,
		hero: state.hero,
		battleNumber,
		rngState: state.rngState,
	});

	return successResult(
		{
			...state,
			phase: "town",
			combat: null,
			battleNumber,
			zoneNumber,
			streak: 0,
			town: town.value,
		},
		[
			{
				type: "RETURNED_TO_TOWN",
			},
		],
	);
}
