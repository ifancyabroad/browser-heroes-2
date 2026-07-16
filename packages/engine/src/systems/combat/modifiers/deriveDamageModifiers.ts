import type { PassiveDamageModifier } from "@app/content";

import type { DerivedDamageModifier, ResolvedModifier } from "./modifier.types";
import { combineModifierValues } from "./modifierOperations";

type ResolvedDamageModifier = ResolvedModifier & {
	modifier: PassiveDamageModifier;
};

export function deriveDamageModifiers(
	modifiers: readonly ResolvedModifier[],
): DerivedDamageModifier[] {
	const groups = new Map<string, ResolvedDamageModifier[]>();

	for (const resolvedModifier of modifiers.filter(isResolvedDamageModifier)) {
		const { modifier } = resolvedModifier;
		const key = `${modifier.damageType ?? "all"}-${modifier.operation}`;
		const group = groups.get(key);

		if (group) {
			group.push(resolvedModifier);
		} else {
			groups.set(key, [resolvedModifier]);
		}
	}

	return [...groups.values()].map((group) => {
		const { modifier } = group[0];

		return {
			damageType: modifier.damageType,
			operation: modifier.operation,
			value: combineModifierValues(
				modifier.operation,
				group.map(({ modifier: contribution }) => contribution.value),
			),
			contributions: group.map(({ modifier: contribution, source }) => ({
				source,
				modifierValue: contribution.value,
			})),
		};
	});
}

function isResolvedDamageModifier(
	resolvedModifier: ResolvedModifier,
): resolvedModifier is ResolvedDamageModifier {
	return resolvedModifier.modifier.type === "modifyDamage";
}

export function toDamageModifiers(
	derivedModifiers: readonly DerivedDamageModifier[],
): PassiveDamageModifier[] {
	return derivedModifiers.flatMap(({ damageType, operation, contributions }) =>
		contributions.map(({ modifierValue }) => ({
			type: "modifyDamage" as const,
			damageType,
			operation,
			value: modifierValue,
		})),
	);
}
