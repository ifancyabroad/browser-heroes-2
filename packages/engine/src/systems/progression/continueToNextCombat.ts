import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { enterCombat } from "../combat/enterCombat";
import { calculateCombatReward, applyCombatReward } from "./rewards";
import { syncHeroFromPlayerCombatant } from "../combat/combatMappers";

export function continueToNextCombat(state: RunState): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "INVALID_PHASE");
	}

	if (state.combat.status !== "enemy_dead") {
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

	const readyState: RunState = {
		...rewardedState,
		phase: "town",
		combat: null,
		battleNumber: state.battleNumber + 1,
		goldMultiplier: state.goldMultiplier + 1,
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
