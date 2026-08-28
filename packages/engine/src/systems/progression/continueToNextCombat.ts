import type { EngineResult, GhostEncounter, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createCombat } from "../combat/createCombat";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";
import { getEndlessCycleForBattle } from "../endless/endlessProgression";
import { carryBattleEffects } from "../combat/effects/carryBattleEffects";

export function continueToNextCombat(
	state: RunState,
	ghostEncounter?: GhostEncounter,
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

	const zoneNumber = getZoneNumberForBattle(battleNumber);
	const endlessCycle = getEndlessCycleForBattle(battleNumber);

	const combatResult = createCombat({
		runId: state.id,
		seed: state.seed,
		hero: state.hero,
		battleNumber,
		zoneNumber,
		endlessCycle,
		ghostEncounter,
	});

	if (!combatResult) {
		return failureResult(state, "NO_ELIGIBLE_ENEMY");
	}

	const combat = {
		...combatResult,
		player: carryBattleEffects(state.combat.player, combatResult.player),
	};

	return successResult(
		{
			...state,
			phase: "combat",
			combat,
			town: null,
			battleNumber,
			zoneNumber,
			endlessCycle,
			streak: state.streak + 1,
		},
		[
			{
				type: "NEXT_COMBAT_READY",
			},
			{
				type: "COMBAT_STARTED",
				combatId: combat.id,
				battleNumber,
				encounterType: combat.encounterType,
				enemySourceId: combat.enemy.sourceId,
			},
		],
	);
}
