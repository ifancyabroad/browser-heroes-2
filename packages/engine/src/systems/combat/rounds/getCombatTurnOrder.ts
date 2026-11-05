import type { CombatantSide, CombatState } from "../../../schemas";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";

export function getCombatTurnOrder(combat: CombatState): [CombatantSide, CombatantSide] {
	const playerFirst =
		getEffectiveCombatStatValue(combat.player, "initiative") >=
		getEffectiveCombatStatValue(combat.enemy, "initiative");

	return playerFirst ? ["player", "enemy"] : ["enemy", "player"];
}
