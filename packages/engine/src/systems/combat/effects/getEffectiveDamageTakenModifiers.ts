import type { ActiveDamageTakenModifier, CombatantState } from "../../../schemas";

export function getEffectiveDamageTakenModifiers(
	combatant: CombatantState,
): CombatantState["combatStats"]["damageModifiers"] {
	return combatant.activeEffects
		.filter(
			(effect): effect is ActiveDamageTakenModifier => effect.type === "modifyDamageTaken",
		)
		.map((effect) => ({
			damageType: effect.damageType,
			operation: effect.operation,
			value: effect.value,
		}));
}
