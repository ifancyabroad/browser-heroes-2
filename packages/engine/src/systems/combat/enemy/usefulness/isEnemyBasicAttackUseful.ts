import type { CombatantState } from "../../../../schemas";
import { getDamageAffinity } from "../../damage/damageAffinity";
import { collectWeaponAttackComponents } from "./collectWeaponAttackComponents";
import { isEnemyEffectUseful } from "./isEnemyEffectUseful";

export function isEnemyBasicAttackUseful(enemy: CombatantState, player: CombatantState): boolean {
	const components = collectWeaponAttackComponents(enemy);
	return (
		components.damageTypes.some((type) => getDamageAffinity(player, type) !== "immune") ||
		components.riderEffects.some((riderEffect) =>
			isEnemyEffectUseful({ ...riderEffect, enemy, player }),
		)
	);
}
