import type { CombatantState } from "../../../schemas";
import type { DamageResult } from "./calculateDamage";

export function applyDamage(combatant: CombatantState, damage: DamageResult): CombatantState {
	return {
		...combatant,
		currentHp: Math.max(0, combatant.currentHp - damage.amount),
	};
}
