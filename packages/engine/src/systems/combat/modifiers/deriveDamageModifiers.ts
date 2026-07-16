import type { PassiveDamageModifier } from "@app/content";

import type { DerivedDamageModifier, ResolvedModifier } from "./modifier.types";
import { combineModifierValues } from "./modifierOperations";

type ResolvedDamageModifier = ResolvedModifier & {
	modifier: PassiveDamageModifier;
};

type OrderedResolvedDamageModifier = ResolvedDamageModifier & {
	order: number;
};

export function deriveDamageModifiers(
	modifiers: readonly ResolvedModifier[],
): DerivedDamageModifier[] {
	const groups = new Map<string, OrderedResolvedDamageModifier[]>();
	const damageModifiers = modifiers.filter(isResolvedDamageModifier);

	for (const [order, resolvedModifier] of damageModifiers.entries()) {
		const { modifier } = resolvedModifier;
		const key = `${modifier.damageType ?? "all"}-${modifier.operation}`;
		const group = groups.get(key);
		const orderedModifier = { ...resolvedModifier, order };

		if (group) {
			group.push(orderedModifier);
		} else {
			groups.set(key, [orderedModifier]);
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
			contributions: group.map(({ modifier: contribution, source, order }) => ({
				source,
				modifierValue: contribution.value,
				order,
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
	return derivedModifiers
		.flatMap(({ damageType, operation, contributions }) =>
			contributions.map(({ modifierValue, order }) => ({
				order,
				modifier: {
					type: "modifyDamage" as const,
					damageType,
					operation,
					value: modifierValue,
				},
			})),
		)
		.sort((left, right) => left.order - right.order)
		.map(({ modifier }) => modifier);
}
