import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createTownState } from "../../state";
import { getNextRunPosition } from "../progression/getNextRunPosition";

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

	const { battleNumber, zoneNumber, zone, endlessCycle } = getNextRunPosition(state);

	const town = createTownState({
		runId: state.id,
		seed: state.seed,
		hero: state.hero,
		zoneNumber,
		battleNumber,
		shopLocks: state.shopLocks,
	});

	return successResult(
		{
			...state,
			phase: "town",
			combat: null,
			battleNumber,
			zoneNumber,
			zone,
			endlessCycle,
			streak: 0,
			town,
		},
		[
			{
				type: "RETURNED_TO_TOWN",
			},
		],
	);
}
