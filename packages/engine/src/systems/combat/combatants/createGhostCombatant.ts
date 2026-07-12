import type { GhostEncounter } from "../../../schemas";
import type { CombatantState } from "../../../schemas";

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
		name: `${ghostEncounter.hero.name}'s Ghost`,
		currentHp: playerLikeCombatant.maxHp,
		activeEffects: [],
	};
}
