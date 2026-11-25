import type { CombatantSide, CombatState } from "../../../schemas";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import { hasActiveStatus } from "../effects/hasActiveStatus";

export function getCombatTurnOrder(combat: CombatState): [CombatantSide, CombatantSide] {
	const playerActsFirst = hasActiveStatus(combat.player, "haste");
	const enemyActsFirst = hasActiveStatus(combat.enemy, "haste");
	if (playerActsFirst !== enemyActsFirst) {
		return playerActsFirst ? ["player", "enemy"] : ["enemy", "player"];
	}

	const playerFirst =
		getEffectiveCombatStatValue(combat.player, "initiative") >=
		getEffectiveCombatStatValue(combat.enemy, "initiative");

	return playerFirst ? ["player", "enemy"] : ["enemy", "player"];
}
