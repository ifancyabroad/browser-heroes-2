import type { CombatState, EngineResult, RunState } from "../../schemas";

import { createCombatId } from "../../core/ids";
import { failureResult, successResult } from "../../core/result";
import { createEnemyCombatantForRun, createPlayerCombatantFromHero } from "./combatMappers";

export function enterCombat(state: RunState): EngineResult {
	if (state.phase !== "town") {
		return failureResult(state, "INVALID_PHASE");
	}

	const combatId = createCombatId(state.id, state.battleNumber);

	const player = createPlayerCombatantFromHero(state.hero);
	const enemy = createEnemyCombatantForRun(state);

	const combat: CombatState = {
		id: combatId,
		encounterType: getEncounterType(state),
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

function getEncounterType(state: RunState): CombatState["encounterType"] {
	if (state.battleNumber % 10 === 0) {
		return "boss";
	}

	return "standard";
}
