import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createTownState } from "../../state";
import { getNextRunPosition } from "../progression/getNextRunPosition";
import { hasActiveStatus } from "../combat/effects/statuses/hasActiveStatus";

export function returnToTown(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	const isVictory = state.combat.status === "player_won";
	const canEscape =
		state.combat.status === "active" &&
		hasActiveStatus(state.combat.player, "invisible") &&
		!hasActiveStatus(state.combat.player, "stunned");

	if (!isVictory && !canEscape) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.hero.pendingLevelUp) {
		return failureResult(state, "LEVEL_UP_REQUIRED");
	}

	if (state.pendingRewardChoice) {
		return failureResult(state, "REWARD_SELECTION_REQUIRED");
	}

	const { battleNumber, zoneNumber, zone, endlessCycle } = isVictory
		? getNextRunPosition(state)
		: state;

	let town = isVictory ? null : state.town;

	if (!town) {
		town = createTownState({
			runId: state.id,
			seed: state.seed,
			hero: state.hero,
			zoneNumber,
			battleNumber,
			shopLocks: state.shopLocks,
		});
	}

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
