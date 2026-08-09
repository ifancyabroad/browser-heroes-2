import type { HeroState, RunState } from "../../../schemas";

import { createPlayerCombatant } from "./createPlayerCombatant";

export function refreshCompletedCombatPlayer(
	combat: RunState["combat"],
	hero: HeroState,
): RunState["combat"] {
	if (!combat || combat.status !== "player_won") {
		return combat;
	}

	return {
		...combat,
		player: createPlayerCombatant(hero, combat.id),
	};
}
