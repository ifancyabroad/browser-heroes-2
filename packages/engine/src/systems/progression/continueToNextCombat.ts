import type { ContinueToNextCombatAction, EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { enterCombat } from "../combat/enterCombat";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";
import { getEndlessCycleForBattle } from "../endless/endlessProgression";

export function continueToNextCombat(
	state: RunState,
	action: ContinueToNextCombatAction,
): EngineResult {
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

	const readyState: RunState = {
		...state,
		phase: "town",
		combat: null,
		battleNumber,
		zoneNumber: getZoneNumberForBattle(battleNumber),
		endlessCycle: getEndlessCycleForBattle(battleNumber),
		streak: state.streak + 1,
	};

	const enterResult = enterCombat(readyState, {
		type: "ENTER_COMBAT",
		ghostEncounter: action.ghostEncounter,
	});

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
