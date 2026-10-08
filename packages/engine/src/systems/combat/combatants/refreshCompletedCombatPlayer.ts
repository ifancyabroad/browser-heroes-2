import type { HeroState, RunState } from "../../../schemas";

import { createPlayerCombatant } from "./createPlayerCombatant";
import { replaceCombatantActiveEffects } from "../effects/replaceCombatantActiveEffects";

export function refreshCompletedCombatPlayer(
	combat: RunState["combat"],
	hero: HeroState,
): RunState["combat"] {
	if (!combat || combat.status !== "player_won") {
		return combat;
	}

	return {
		...combat,
		player: replaceCombatantActiveEffects(
			createPlayerCombatant(hero, combat.id),
			combat.player.activeEffects,
		),
	};
}
