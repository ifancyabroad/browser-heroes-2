import type { DamageType } from "@app/content";

import type { ActiveDamageAffinityModifier, CombatantState } from "../../../schemas";

type DamageAffinityKey = "resistances" | "immunities" | "vulnerabilities";

export function getEffectiveDamageAffinities(
	combatant: CombatantState,
): CombatantState["combatStats"]["damageAffinities"] {
	return {
		resistances: getEffectiveAffinityValues(combatant, "resistances", "resistance"),
		immunities: getEffectiveAffinityValues(combatant, "immunities", "immunity"),
		vulnerabilities: getEffectiveAffinityValues(combatant, "vulnerabilities", "vulnerability"),
	};
}

function getEffectiveAffinityValues(
	combatant: CombatantState,
	key: DamageAffinityKey,
	affinity: ActiveDamageAffinityModifier["affinity"],
): DamageType[] {
	const values = new Set(combatant.combatStats.damageAffinities[key]);

	const modifiers = combatant.activeEffects.filter(
		(effect): effect is ActiveDamageAffinityModifier =>
			effect.type === "modifyDamageAffinity" && effect.affinity === affinity,
	);

	for (const modifier of modifiers) {
		if (modifier.operation === "add") {
			values.add(modifier.damageType);
		} else {
			values.delete(modifier.damageType);
		}
	}

	return [...values];
}
