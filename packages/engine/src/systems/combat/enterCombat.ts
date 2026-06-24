import type { CombatState, EngineResult, RunState } from "../../schemas";

import { createCombatId } from "../../core/ids";
import { failureResult, successResult } from "../../core/result";

import { getEncounterTypeForBattle, selectEnemyForEncounter } from "../encounters";

import { createEnemyCombatant } from "./combatants/createEnemyCombatant";
import { createPlayerCombatant } from "./combatants/createPlayerCombatant";
import { createCombatLogEntry } from "./logs/createCombatLogEntry";

export function enterCombat(state: RunState): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const selectedEnemy = selectEnemyForEncounter(state);

	if (!selectedEnemy) {
		return failureResult(state, "NO_ELIGIBLE_ENEMY");
	}

	const combatId = createCombatId(state.id, state.battleNumber);

	const player = createPlayerCombatant(state.hero, combatId);

	const enemy = createEnemyCombatant(selectedEnemy.value, combatId);

	const combat: CombatState = {
		id: combatId,
		encounterType: getEncounterTypeForBattle(state.battleNumber),
		turnNumber: 1,
		activeActor: "player",
		player,
		enemy,
		log: [
			createCombatLogEntry(combatId, 1, {
				turnNumber: 1,
				actor: "system",
				message: `Combat started: ${player.name} ` + `vs ${enemy.name}.`,
				eventType: "combat_started",
			}),
		],
		status: "active",
	};

	return successResult(
		{
			...state,
			rngState: selectedEnemy.rngState,
			phase: "combat",
			combat,
		},
		[
			{
				type: "COMBAT_STARTED",
				combatId,
			},
		],
	);
}
