import type { CombatantState } from "../../../schemas";

import type { DamageResult } from "./calculateDamage";
import { replaceCombatantActiveEffects } from "../effects/replaceCombatantActiveEffects";

export type ApplyDamageResult = {
	combatant: CombatantState;
	hpDamage: number;
	absorbedDamage: number;
};

export function applyDamage(combatant: CombatantState, damage: DamageResult): ApplyDamageResult {
	let remainingDamage = damage.amount;
	let absorbedDamage = 0;

	const activeEffects = combatant.activeEffects.map((effect) => {
		if (effect.type !== "shield" || remainingDamage <= 0) {
			return effect;
		}

		const absorbed = Math.min(effect.remainingAmount, remainingDamage);

		remainingDamage -= absorbed;
		absorbedDamage += absorbed;

		return {
			...effect,
			remainingAmount: effect.remainingAmount - absorbed,
		};
	});

	const remainingActiveEffects = activeEffects.filter(
		(effect) => effect.type !== "shield" || effect.remainingAmount > 0,
	);

	const combatantWithRemainingEffects = replaceCombatantActiveEffects(
		combatant,
		remainingActiveEffects,
	);

	return {
		combatant: {
			...combatantWithRemainingEffects,
			currentHp: Math.max(0, combatant.currentHp - remainingDamage),
		},
		hpDamage: remainingDamage,
		absorbedDamage,
	};
}
