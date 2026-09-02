import type { CombatantState, CombatState, GhostEncounter, HeroState } from "../../schemas";
import { createContextRngState } from "../../core/rng";

import { createCombatId } from "../../core/ids";
import { getEncounterTypeForBattle, selectEnemyForEncounter } from "../encounters";
import { createEnemyCombatant } from "./combatants/createEnemyCombatant";
import { createGhostCombatant } from "./combatants/createGhostCombatant";
import { createPlayerCombatant } from "./combatants/createPlayerCombatant";
import { createCombatLogEntry } from "./logs/createCombatLogEntry";

type CreateCombatInput = {
	runId: string;
	seed: string;
	hero: HeroState;
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	ghostEncounter?: GhostEncounter;
};

export function createCombat(input: CreateCombatInput): CombatState | null {
	const combatId = createCombatId(input.runId, input.battleNumber);
	const player = createPlayerCombatant(input.hero, combatId);

	let enemy: CombatantState;
	let encounterType: CombatState["encounterType"];

	if (input.ghostEncounter) {
		enemy = createGhostCombatant(input.ghostEncounter, combatId);
		encounterType = "ghost";
	} else {
		const selectedEnemy = selectEnemyForEncounter({
			battleNumber: input.battleNumber,
			zoneNumber: input.zoneNumber,
			rngState: createContextRngState(input.seed, "enemy", input.battleNumber),
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
	}

	return {
		id: combatId,
		encounterType,
		ghostUsername: input.ghostEncounter?.ghostUsername ?? null,
		ghostSource: input.ghostEncounter?.ghostSource ?? null,
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
	};
}
