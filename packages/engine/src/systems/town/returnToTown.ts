import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { applyCombatReward, calculateCombatReward } from "../progression/rewards";
import { syncHeroFromPlayerCombatant } from "../combat/combatMappers";

export function returnToTown(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "player_won") {
		return failureResult(state, "INVALID_PHASE");
	}

	const reward = calculateCombatReward(state);

	const rewardedState = applyCombatReward(
		{
			...state,
			hero: syncHeroFromPlayerCombatant(state.hero, state.combat.player),
		},
		reward,
	);

	return successResult(
		{
			...rewardedState,
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
