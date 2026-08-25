import type { PassiveDamageModifier, PassiveDamageTakenModifier } from "@app/content";

import type { DerivedDamageModifier, ResolvedModifier } from "./modifier.types";
import { combineModifierValues } from "./modifierOperations";

type ResolvedDamageModifier = ResolvedModifier & {
	modifier: PassiveDamageModifier;
};

type ResolvedDamageTakenModifier = ResolvedModifier & {
	modifier: PassiveDamageTakenModifier;
};

type ResolvedDamageAdjustment = ResolvedDamageModifier | ResolvedDamageTakenModifier;

type OrderedResolvedDamageAdjustment = ResolvedDamageAdjustment & {
	order: number;
};

type CombatantDamageModifier = Omit<PassiveDamageModifier, "type">;

export function deriveDamageModifiers(
	modifiers: readonly ResolvedModifier[],
): DerivedDamageModifier[] {
	return deriveDamageAdjustments(modifiers.filter(isResolvedDamageModifier));
}

export function deriveDamageTakenModifiers(
	modifiers: readonly ResolvedModifier[],
): DerivedDamageModifier[] {
	return deriveDamageAdjustments(modifiers.filter(isResolvedDamageTakenModifier));
}

function deriveDamageAdjustments(
	modifiers: readonly ResolvedDamageAdjustment[],
): DerivedDamageModifier[] {
	const groups = new Map<string, OrderedResolvedDamageAdjustment[]>();

	for (const [order, resolvedModifier] of modifiers.entries()) {
		const { modifier } = resolvedModifier;
		const key = [
			modifier.damageType ?? "allTypes",
			modifier.damageClass ?? "allClasses",
			modifier.attackRange ?? "allRanges",
			modifier.operation,
		].join("-");

		const orderedModifier = {
			...resolvedModifier,
			order,
		};

		const group = groups.get(key);

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
			damageClass: modifier.damageClass,
			attackRange: modifier.attackRange,
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

export function toCombatantDamageModifiers(
	derivedModifiers: readonly DerivedDamageModifier[],
): CombatantDamageModifier[] {
	return derivedModifiers
		.flatMap(({ damageType, damageClass, attackRange, operation, contributions }) =>
			contributions.map(({ modifierValue, order }) => ({
				order,
				modifier: {
					damageType,
					damageClass,
					attackRange,
					operation,
					value: modifierValue,
				},
			})),
		)
		.sort((left, right) => left.order - right.order)
		.map(({ modifier }) => modifier);
}

function isResolvedDamageModifier(
	resolvedModifier: ResolvedModifier,
): resolvedModifier is ResolvedDamageModifier {
	return resolvedModifier.modifier.type === "modifyDamage";
}

function isResolvedDamageTakenModifier(
	resolvedModifier: ResolvedModifier,
): resolvedModifier is ResolvedDamageTakenModifier {
	return resolvedModifier.modifier.type === "modifyDamageTaken";
}
