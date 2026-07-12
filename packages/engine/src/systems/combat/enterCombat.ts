import type { CombatState, EngineResult, EnterCombatAction, RunState } from "../../schemas";

import { createCombatId } from "../../core/ids";
import { failureResult, successResult } from "../../core/result";

import { createEncounterCombatant } from "./combatants/createEncounterCombatant";
import { createPlayerCombatant } from "./combatants/createPlayerCombatant";
import { createCombatLogEntry } from "./logs/createCombatLogEntry";

export function enterCombat(
	state: RunState,
	action: EnterCombatAction = { type: "ENTER_COMBAT" },
): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const combatId = createCombatId(state.id, state.battleNumber);

	const encounter = createEncounterCombatant(state, action, combatId);

	if (!encounter) {
		return failureResult(state, "NO_ELIGIBLE_ENEMY");
	}

	const player = createPlayerCombatant(state.hero, combatId);

	const combat: CombatState = {
		id: combatId,
		encounterType: encounter.encounterType,
		turnNumber: 1,
		activeActor: "player",
		player,
		enemy: encounter.enemy,
		log: [
			createCombatLogEntry(combatId, 1, {
				turnNumber: 1,
				actor: "system",
				message: `Combat started: ${player.name} vs ${encounter.enemy.name}.`,
				eventType: "combat_started",
			}),
		],
		status: "active",
	};

	return successResult(
		{
			...state,
			rngState: encounter.rngState,
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
