import type { CombatantState } from "../../../schemas";
import {
	ENDLESS_DAMAGE_INCREASE_PER_CYCLE,
	ENDLESS_DAMAGE_TAKEN_MULTIPLIER_PER_CYCLE,
} from "../../endless/endlessConstants";

export function applyEndlessEnemyScaling(
	enemy: CombatantState,
	endlessCycle: number,
): CombatantState {
	if (endlessCycle <= 0) {
		return enemy;
	}

	const damageDealtMultiplier = 1 + endlessCycle * ENDLESS_DAMAGE_INCREASE_PER_CYCLE;
	const damageTakenMultiplier = ENDLESS_DAMAGE_TAKEN_MULTIPLIER_PER_CYCLE ** endlessCycle;

	return {
		...enemy,
		combatStats: {
			...enemy.combatStats,
			damageModifiers: [
				...enemy.combatStats.damageModifiers,
				{
					operation: "multiply",
					value: damageDealtMultiplier,
				},
			],
			damageTakenModifiers: [
				...enemy.combatStats.damageTakenModifiers,
				{
					operation: "multiply",
					value: damageTakenMultiplier,
				},
			],
		},
	};
}
