import type { ActiveCombatEffect, CombatantState } from "../../../schemas";

export type AdvanceActiveEffectsResult = {
	combatant: CombatantState;
	expiredEffects: ActiveCombatEffect[];
};

export function advanceActiveEffects(combatant: CombatantState): AdvanceActiveEffectsResult {
	const activeEffects: ActiveCombatEffect[] = [];
	const expiredEffects: ActiveCombatEffect[] = [];

	for (const effect of combatant.activeEffects) {
		const remainingTurns = effect.remainingTurns - 1;

		if (remainingTurns <= 0) {
			expiredEffects.push(effect);
			continue;
		}

		activeEffects.push({
			...effect,
			remainingTurns,
		});
	}

	return {
		combatant: {
			...combatant,
			activeEffects,
		},
		expiredEffects,
	};
}
