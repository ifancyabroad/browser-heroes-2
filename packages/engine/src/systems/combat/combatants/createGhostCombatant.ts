import type { CombatantState, GhostEncounter } from "../../../schemas";

import { CLASSES_BY_ID } from "@app/content";
import { createCombatantId } from "../../../core/ids";
import { createPlayerCombatant } from "./createPlayerCombatant";

export function createGhostCombatant(
	ghostEncounter: GhostEncounter,
	combatId: string,
): CombatantState {
	const playerLikeCombatant = createPlayerCombatant(ghostEncounter.hero, combatId);
	const classDefinition = CLASSES_BY_ID[ghostEncounter.hero.classId];

	return {
		...playerLikeCombatant,
		id: createCombatantId(combatId, "enemy"),
		side: "enemy",
		sourceId: ghostEncounter.ghostId,
		name: `Fallen ${classDefinition.name} ${ghostEncounter.hero.name}`,
		portrait: classDefinition.enemyPortrait,
		currentHp: playerLikeCombatant.maxHp,
		activeEffects: [],
	};
}
