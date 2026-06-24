import type { PassiveDamageAffinityModifier } from "@app/content";
import type { CombatantState } from "../../../schemas";

import type { CombatModifier } from "./applyStatModifiers";

type DamageAffinities = CombatantState["damageAffinities"];

export function applyPassiveDamageAffinities(
	baseAffinities: DamageAffinities,
	modifiers: readonly CombatModifier[],
): DamageAffinities {
	return modifiers.reduce<DamageAffinities>(
		(affinities, modifier) => {
			if (modifier.type !== "modifyDamageAffinity") {
				return affinities;
			}

			return applyDamageAffinityModifier(affinities, modifier);
		},
		{
			resistances: [...baseAffinities.resistances],
			immunities: [...baseAffinities.immunities],
			vulnerabilities: [...baseAffinities.vulnerabilities],
		},
	);
}

function applyDamageAffinityModifier(
	affinities: DamageAffinities,
	modifier: PassiveDamageAffinityModifier,
): DamageAffinities {
	const collection = getDamageAffinityCollection(modifier.affinity);
	const currentValues = affinities[collection];

	const nextValues =
		modifier.operation === "add"
			? [...new Set([...currentValues, modifier.damageType])]
			: currentValues.filter((damageType) => damageType !== modifier.damageType);

	return {
		...affinities,
		[collection]: nextValues,
	};
}

function getDamageAffinityCollection(
	affinity: PassiveDamageAffinityModifier["affinity"],
): keyof DamageAffinities {
	switch (affinity) {
		case "resistance":
			return "resistances";

		case "immunity":
			return "immunities";

		case "vulnerability":
			return "vulnerabilities";
	}
}
