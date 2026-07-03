import type { CombatantState } from "../../../schemas";

export type ApplyHealingResult = {
	combatant: CombatantState;
	actualHealing: number;
};

export function applyHealing(combatant: CombatantState, amount: number): ApplyHealingResult {
	const actualHealing = Math.min(amount, combatant.maxHp - combatant.currentHp);

	return {
		combatant: {
			...combatant,
			currentHp: combatant.currentHp + actualHealing,
		},
		actualHealing,
	};
}
