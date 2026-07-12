import type { CombatantState, GhostEncounter } from "../../../schemas";

import { CLASSES_BY_ID } from "@app/content";
import { createCombatantId } from "../../../core/ids";
import { createPlayerCombatant } from "./createPlayerCombatant";

export function createGhostCombatant(
	ghostEncounter: GhostEncounter,
	combatId: string,
): CombatantState {
	const playerLikeCombatant = createPlayerCombatant(ghostEncounter.hero, combatId);

	return {
		...playerLikeCombatant,
		id: createCombatantId(combatId, "enemy"),
		side: "enemy",
		sourceId: ghostEncounter.ghostId,
		name: createGhostDisplayName(ghostEncounter),
		currentHp: playerLikeCombatant.maxHp,
		activeEffects: [],
	};
}

function createGhostDisplayName(ghostEncounter: GhostEncounter): string {
	const classDefinition = CLASSES_BY_ID[ghostEncounter.hero.classId];

	return `Fallen ${classDefinition.name} ${ghostEncounter.hero.name}`;
}
