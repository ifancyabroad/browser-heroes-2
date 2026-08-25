import type { ActiveDamageModifier, CombatantState } from "../../../schemas";

export function getEffectiveDamageModifiers(
	combatant: CombatantState,
): CombatantState["combatStats"]["damageModifiers"] {
	const temporaryModifiers = combatant.activeEffects
		.filter((effect): effect is ActiveDamageModifier => effect.type === "modifyDamage")
		.map((effect) => ({
			damageType: effect.damageType,
			damageClass: effect.damageClass,
			attackRange: effect.attackRange,
			operation: effect.operation,
			value: effect.value,
		}));

	return [...combatant.combatStats.damageModifiers, ...temporaryModifiers];
}
