import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";
import { createTownState } from "../../state";
import { getEndlessCycleForBattle } from "../endless/endlessProgression";
import { createItemOfferEvents } from "../items/createItemOfferEvents";

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
	const endlessCycle = getEndlessCycleForBattle(battleNumber);

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
			endlessCycle,
			streak: 0,
			town,
		},
		[
			{
				type: "RETURNED_TO_TOWN",
			},
			...createItemOfferEvents({
				items: town.shopSlots.map((slot) => slot.item),
				source: "shop",
				battleNumber,
			}),
		],
	);
}
