import type { CombatantSide, CombatState } from "../../../schemas";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";

export function getCombatTurnOrder(combat: CombatState): [CombatantSide, CombatantSide] {
	const playerActsFirst = combat.player.activeEffects.some(
		(effect) => effect.type === "actFirst",
	);
	const enemyActsFirst = combat.enemy.activeEffects.some((effect) => effect.type === "actFirst");
	if (playerActsFirst !== enemyActsFirst) {
		return playerActsFirst ? ["player", "enemy"] : ["enemy", "player"];
	}

	const playerFirst =
		getEffectiveCombatStatValue(combat.player, "initiative") >=
		getEffectiveCombatStatValue(combat.enemy, "initiative");

	return playerFirst ? ["player", "enemy"] : ["enemy", "player"];
}
