import type { ActiveCombatEffect, CombatantState } from "../../../schemas";

import { isSameActiveEffectSource } from "./activeEffectSource";
import { replaceCombatantActiveEffects } from "./replaceCombatantActiveEffects";

export function upsertActiveCombatEffect(
	combatant: CombatantState,
	effect: ActiveCombatEffect,
): CombatantState {
	const existingEffectIndex = combatant.activeEffects.findIndex((activeEffect) =>
		isSameActiveEffectSource(activeEffect, effect),
	);

	if (existingEffectIndex === -1) {
		return replaceCombatantActiveEffects(combatant, [...combatant.activeEffects, effect]);
	}

	return replaceCombatantActiveEffects(
		combatant,
		combatant.activeEffects.map((activeEffect, index) => {
			if (index !== existingEffectIndex) {
				return activeEffect;
			}

			return {
				...effect,
				id: activeEffect.id,
			};
		}),
	);
}
