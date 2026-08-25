import type { ActiveDamageTakenModifier, CombatantState } from "../../../schemas";

export function getEffectiveDamageTakenModifiers(
	combatant: CombatantState,
): CombatantState["combatStats"]["damageTakenModifiers"] {
	const temporaryModifiers = combatant.activeEffects
		.filter(
			(effect): effect is ActiveDamageTakenModifier => effect.type === "modifyDamageTaken",
		)
		.map((effect) => ({
			damageType: effect.damageType,
			damageClass: effect.damageClass,
			attackRange: effect.attackRange,
			operation: effect.operation,
			value: effect.value,
		}));

	return [...combatant.combatStats.damageTakenModifiers, ...temporaryModifiers];
}
