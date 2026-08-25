import type { CombatantState, GhostEncounter } from "../../../schemas";

import { CLASSES_BY_ID } from "@app/content";
import { createCombatantId } from "../../../core/ids";
import { createPlayerCombatant } from "./createPlayerCombatant";
import { applyEndlessEnemyScaling } from "./applyEndlessEnemyScaling";

export function createGhostCombatant(
	ghostEncounter: GhostEncounter,
	combatId: string,
	endlessCycle = 0,
): CombatantState {
	const playerLikeCombatant = createPlayerCombatant(ghostEncounter.hero, combatId);
	const classDefinition = CLASSES_BY_ID[ghostEncounter.hero.classId];

	return applyEndlessEnemyScaling(
		{
			...playerLikeCombatant,
			id: createCombatantId(combatId, "enemy"),
			side: "enemy",
			sourceId: ghostEncounter.ghostId,
			name: `Fallen ${classDefinition.name} ${ghostEncounter.hero.name}`,
			portrait: classDefinition.enemyPortrait,
			currentHp: playerLikeCombatant.maxHp,
			activeEffects: [],
			tactic: classDefinition.combat.tactic,
		},
		endlessCycle,
	);
}
