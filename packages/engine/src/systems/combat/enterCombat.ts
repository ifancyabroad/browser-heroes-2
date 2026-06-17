import type { CombatState, EngineResult, RunState } from "../../schemas";

import { createCombatId } from "../../core/ids";
import { failureResult, successResult } from "../../core/result";
import { createEnemyCombatantFromDefinition, createPlayerCombatantFromHero } from "./combatMappers";
import { getEncounterTypeForBattle, selectEnemyForRun } from "./encounters";

export function enterCombat(state: RunState): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const combatId = createCombatId(state.id, state.battleNumber);

	const selectedEnemy = selectEnemyForRun(state);

	if (!selectedEnemy) {
		return failureResult(state, "VALIDATION_FAILED");
	}

	const player = createPlayerCombatantFromHero(state.hero, combatId);
	const enemy = createEnemyCombatantFromDefinition(selectedEnemy.value, combatId);

	const combat: CombatState = {
		id: combatId,
		encounterType: getEncounterTypeForBattle(state.battleNumber),
		turnNumber: 1,
		activeActor: "player",
		player,
		enemy,
		log: [
			{
				id: `${combatId}:log:1`,
				turnNumber: 1,
				actor: "system",
				message: `Combat started: ${player.name} vs ${enemy.name}.`,
				eventType: "combat_started",
			},
		],
		status: "active",
	};

	return successResult(
		{
			...state,
			rngState: selectedEnemy.rngState,
			phase: "combat",
			combat,
			town: null,
		},
		[
			{
				type: "COMBAT_STARTED",
				combatId,
			},
		],
	);
}
