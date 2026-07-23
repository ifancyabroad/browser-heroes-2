import type { ActiveCombatEffect, CombatantState } from "../../../schemas";
import { reconcileCombatantMaxHpChange } from "./reconcileCombatantMaxHpChange";

export function replaceCombatantActiveEffects(
	combatant: CombatantState,
	activeEffects: ActiveCombatEffect[],
): CombatantState {
	return reconcileCombatantMaxHpChange(combatant, {
		...combatant,
		activeEffects,
	});
}
