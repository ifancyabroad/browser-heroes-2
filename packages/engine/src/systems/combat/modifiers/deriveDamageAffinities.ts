import type {
	DamageAffinities,
	DamageAffinityKind,
	DamageType,
	PassiveDamageAffinityModifier,
} from "@app/content";

import type {
	DerivedDamageAffinities,
	DerivedDamageAffinity,
	ResolvedModifier,
} from "./modifier.types";

export function deriveDamageAffinities(
	baseAffinities: DamageAffinities,
	modifiers: readonly ResolvedModifier[],
): DerivedDamageAffinities {
	const affinityModifiers = modifiers.filter(isResolvedDamageAffinityModifier);

	return {
		resistances: deriveAffinityCollection(
			"resistance",
			baseAffinities.resistances,
			affinityModifiers,
		),

		immunities: deriveAffinityCollection(
			"immunity",
			baseAffinities.immunities,
			affinityModifiers,
		),

		vulnerabilities: deriveAffinityCollection(
			"vulnerability",
			baseAffinities.vulnerabilities,
			affinityModifiers,
		),
	};
}

type ResolvedDamageAffinityModifier = ResolvedModifier & {
	modifier: PassiveDamageAffinityModifier;
};

function deriveAffinityCollection(
	affinity: DamageAffinityKind,
	baseDamageTypes: readonly DamageType[],
	modifiers: readonly ResolvedDamageAffinityModifier[],
): DerivedDamageAffinity[] {
	const relevantModifiers = modifiers.filter(({ modifier }) => modifier.affinity === affinity);

	const damageTypes = new Set<DamageType>([
		...baseDamageTypes,
		...relevantModifiers.map(({ modifier }) => modifier.damageType),
	]);

	return [...damageTypes].map((damageType) =>
		deriveDamageAffinity(damageType, baseDamageTypes.includes(damageType), relevantModifiers),
	);
}

function deriveDamageAffinity(
	damageType: DamageType,
	baseValue: boolean,
	modifiers: readonly ResolvedDamageAffinityModifier[],
): DerivedDamageAffinity {
	return modifiers.reduce<DerivedDamageAffinity>(
		(derived, resolvedModifier) => {
			const { modifier, source } = resolvedModifier;

			if (modifier.damageType !== damageType) {
				return derived;
			}

			const previousValue = derived.value;

			const resultingValue = modifier.operation === "add";

			return {
				...derived,
				value: resultingValue,
				contributions: [
					...derived.contributions,
					{
						source,
						operation: modifier.operation,
						previousValue,
						resultingValue,
					},
				],
			};
		},
		{
			damageType,
			baseValue,
			value: baseValue,
			contributions: [],
		},
	);
}

function isResolvedDamageAffinityModifier(
	resolvedModifier: ResolvedModifier,
): resolvedModifier is ResolvedDamageAffinityModifier {
	return resolvedModifier.modifier.type === "modifyDamageAffinity";
}

export function toDamageAffinities(derived: DerivedDamageAffinities): DamageAffinities {
	const resistances = new Set(getActiveDamageTypes(derived.resistances));
	const immunities = new Set(getActiveDamageTypes(derived.immunities));
	const vulnerabilities = new Set(getActiveDamageTypes(derived.vulnerabilities));

	for (const damageType of immunities) {
		resistances.delete(damageType);
		vulnerabilities.delete(damageType);
	}

	for (const damageType of resistances) {
		if (vulnerabilities.has(damageType)) {
			resistances.delete(damageType);
			vulnerabilities.delete(damageType);
		}
	}

	return {
		resistances: [...resistances],
		immunities: [...immunities],
		vulnerabilities: [...vulnerabilities],
	};
}

function getActiveDamageTypes(affinities: readonly DerivedDamageAffinity[]): DamageType[] {
	return affinities.filter(({ value }) => value).map(({ damageType }) => damageType);
}
