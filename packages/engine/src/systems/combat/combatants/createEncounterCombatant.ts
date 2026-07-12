import type { CombatState, CombatantState, EnterCombatAction, RunState } from "../../../schemas";
import type { RngState } from "../../../core/rng";

import { getEncounterTypeForBattle, selectEnemyForEncounter } from "../../encounters";
import { createEnemyCombatant } from "./createEnemyCombatant";
import { createGhostCombatant } from "./createGhostCombatant";

type EncounterCombatantResult = {
	enemy: CombatantState;
	encounterType: CombatState["encounterType"];
	rngState: RngState;
};

export function createEncounterCombatant(
	state: RunState,
	action: EnterCombatAction,
	combatId: string,
): EncounterCombatantResult | null {
	if (action.ghostEncounter) {
		return {
			enemy: createGhostCombatant(action.ghostEncounter, combatId),
			encounterType: "ghost",
			rngState: state.rngState,
		};
	}

	const selectedEnemy = selectEnemyForEncounter(state);

	if (!selectedEnemy) {
		return null;
	}

	return {
		enemy: createEnemyCombatant(
			selectedEnemy.value,
			combatId,
			state.zoneNumber,
			state.endlessCycle,
		),
		encounterType: getEncounterTypeForBattle(state.battleNumber),
		rngState: selectedEnemy.rngState,
	};
}
