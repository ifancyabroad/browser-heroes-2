import type { ActiveHealingModifier, CombatantState } from "../../../schemas";

export function getEffectiveHealingMultiplier(combatant: CombatantState): number {
	return combatant.activeEffects
		.filter((effect): effect is ActiveHealingModifier => effect.type === "modifyHealing")
		.reduce(
			(multiplier, effect) => multiplier * effect.multiplier,
			combatant.combatStats.healingMultiplier,
		);
}
