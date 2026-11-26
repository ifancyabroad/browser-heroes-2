import type { EngineResult, GhostEncounter, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createCombat } from "./createCombat";
import { applyFirstBattleProtection } from "../../state/applyFirstBattleProtection";

export function enterCombat(state: RunState, ghostEncounter?: GhostEncounter): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const combatResult = createCombat({
		runId: state.id,
		seed: state.seed,
		hero: state.hero,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: state.zone,
		endlessCycle: state.endlessCycle,
		ghostEncounter,
	});

	if (!combatResult) {
		return failureResult(state, "NO_ELIGIBLE_ENEMY");
	}

	const combat =
		state.battleNumber === 1
			? applyFirstBattleProtection(combatResult, state.seed)
			: combatResult;

	return successResult(
		{
			...state,
			phase: "combat",
			combat,
		},
		[
			{
				type: "COMBAT_STARTED",
				combatId: combatResult.id,
				battleNumber: state.battleNumber,
				encounterType: combatResult.encounterType,
				enemySourceId: combatResult.enemy.sourceId,
			},
		],
	);
}
