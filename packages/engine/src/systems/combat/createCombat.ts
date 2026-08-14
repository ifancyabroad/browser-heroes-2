import type { CombatantState, CombatState, GhostEncounter, HeroState } from "../../schemas";
import type { RngResult, RngState } from "../../core/rng";

import { createCombatId } from "../../core/ids";
import { getEncounterTypeForBattle, selectEnemyForEncounter } from "../encounters";
import { createEnemyCombatant } from "./combatants/createEnemyCombatant";
import { createGhostCombatant } from "./combatants/createGhostCombatant";
import { createPlayerCombatant } from "./combatants/createPlayerCombatant";
import { createCombatLogEntry } from "./logs/createCombatLogEntry";

type CreateCombatInput = {
	runId: string;
	hero: HeroState;
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	rngState: RngState;
	ghostEncounter?: GhostEncounter;
};

export function createCombat(input: CreateCombatInput): RngResult<CombatState> | null {
	const combatId = createCombatId(input.runId, input.battleNumber);
	const player = createPlayerCombatant(input.hero, combatId);

	let enemy: CombatantState;
	let encounterType: CombatState["encounterType"];
	let rngState: RngState;

	if (input.ghostEncounter) {
		enemy = createGhostCombatant(input.ghostEncounter, combatId);
		encounterType = "ghost";
		rngState = input.rngState;
	} else {
		const selectedEnemy = selectEnemyForEncounter({
			battleNumber: input.battleNumber,
			zoneNumber: input.zoneNumber,
			rngState: input.rngState,
		});

		if (!selectedEnemy) {
			return null;
		}

		enemy = createEnemyCombatant(
			selectedEnemy.value,
			combatId,
			input.zoneNumber,
			input.endlessCycle,
		);
		encounterType = getEncounterTypeForBattle(input.battleNumber);
		rngState = selectedEnemy.rngState;
	}

	return {
		value: {
			id: combatId,
			encounterType,
			ghostUsername: input.ghostEncounter?.ghostUsername ?? null,
			turnNumber: 1,
			activeActor: "player",
			player,
			enemy,
			log: [
				createCombatLogEntry(combatId, 1, {
					turnNumber: 1,
					actor: "system",
					message: `Combat begins between ${player.name} and ${enemy.name}.`,
					eventType: "combat_started",
				}),
			],
			status: "active",
		},
		rngState,
	};
}
