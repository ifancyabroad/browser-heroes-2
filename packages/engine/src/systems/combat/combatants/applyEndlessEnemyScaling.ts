import type { CombatantState } from "../../../schemas";
import { ENDLESS_DAMAGE_BONUS_PER_CYCLE } from "../../endless/endlessConstants";

export function applyEndlessEnemyScaling(
	enemy: CombatantState,
	endlessCycle: number,
): CombatantState {
	if (endlessCycle <= 0) {
		return enemy;
	}

	const endlessPressure = 1 + endlessCycle * ENDLESS_DAMAGE_BONUS_PER_CYCLE;

	return {
		...enemy,
		combatStats: {
			...enemy.combatStats,
			damageModifiers: [
				...enemy.combatStats.damageModifiers,
				{
					operation: "multiply",
					value: endlessPressure,
				},
			],
		},
	};
}
