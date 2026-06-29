import type { ActiveCombatEffect, CombatantState } from "../../../schemas";

export function upsertActiveCombatEffect(
	combatant: CombatantState,
	effect: ActiveCombatEffect,
): CombatantState {
	const existingEffectIndex = combatant.activeEffects.findIndex(
		(activeEffect) =>
			activeEffect.sourceCombatantId === effect.sourceCombatantId &&
			activeEffect.sourceSkillId === effect.sourceSkillId &&
			activeEffect.sourceEffectIndex === effect.sourceEffectIndex,
	);

	if (existingEffectIndex === -1) {
		return {
			...combatant,
			activeEffects: [...combatant.activeEffects, effect],
		};
	}

	return {
		...combatant,
		activeEffects: combatant.activeEffects.map((activeEffect, index) => {
			if (index !== existingEffectIndex) {
				return activeEffect;
			}

			return {
				...effect,
				id: activeEffect.id,
			};
		}),
	};
}
