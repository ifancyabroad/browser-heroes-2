import type { DamageAffinities, PassiveDamageModifier } from "@app/content";

import type { CombatantCombatStats } from "../../../schemas";

import { applyPassiveDamageAffinities } from "./applyDamageAffinityModifiers";
import type { DerivedValue, ResolvedModifier } from "./modifier.types";
import { resolveModifiedStat } from "./resolveModifiedStat";

export type ResolvedDamageModifier = ResolvedModifier & {
	modifier: PassiveDamageModifier;
};

export type DerivedCombatStats = {
	armourClass: DerivedValue;
	proficiencyBonus: DerivedValue;
	attackRollBonus: DerivedValue;
	savingThrowBonus: DerivedValue;
	saveDcBonus: DerivedValue;
	critChance: DerivedValue;
	critMultiplier: DerivedValue;
	damageReduction: DerivedValue;
	healingMultiplier: DerivedValue;
	damageAffinities: DamageAffinities;
	damageModifiers: ResolvedDamageModifier[];
};

type DeriveCombatStatsInput = {
	baseArmourClass: number;
	baseProficiencyBonus: number;
	baseDamageAffinities: DamageAffinities;
	modifiers: readonly ResolvedModifier[];
};

export function deriveCombatStats(input: DeriveCombatStatsInput): DerivedCombatStats {
	const { modifiers } = input;

	return {
		armourClass: resolveNonNegativeIntegerStat("armourClass", input.baseArmourClass, modifiers),

		proficiencyBonus: resolveNonNegativeIntegerStat(
			"proficiencyBonus",
			input.baseProficiencyBonus,
			modifiers,
		),

		attackRollBonus: resolveModifiedStat("attackRollBonus", 0, modifiers),

		savingThrowBonus: resolveModifiedStat("savingThrowBonus", 0, modifiers),

		saveDcBonus: resolveModifiedStat("saveDcBonus", 0, modifiers),

		critChance: resolveModifiedStat("critChance", 0, modifiers),

		critMultiplier: resolveModifiedStat("critMultiplier", 2, modifiers),

		damageReduction: resolveModifiedStat("damageReduction", 0, modifiers),

		healingMultiplier: resolveModifiedStat("healingMultiplier", 1, modifiers),

		damageAffinities: applyPassiveDamageAffinities(input.baseDamageAffinities, modifiers),

		damageModifiers: modifiers.filter(isResolvedDamageModifier),
	};
}

function resolveNonNegativeIntegerStat(
	stat: "armourClass" | "proficiencyBonus",
	baseValue: number,
	modifiers: readonly ResolvedModifier[],
): DerivedValue {
	const derivedValue = resolveModifiedStat(stat, baseValue, modifiers);

	return {
		...derivedValue,
		value: Math.max(0, Math.floor(derivedValue.value)),
	};
}

function isResolvedDamageModifier(
	resolvedModifier: ResolvedModifier,
): resolvedModifier is ResolvedDamageModifier {
	return resolvedModifier.modifier.type === "modifyDamage";
}

export function toCombatantCombatStats(derived: DerivedCombatStats): CombatantCombatStats {
	return {
		armourClass: derived.armourClass.value,
		proficiencyBonus: derived.proficiencyBonus.value,
		attackRollBonus: derived.attackRollBonus.value,
		savingThrowBonus: derived.savingThrowBonus.value,
		saveDcBonus: derived.saveDcBonus.value,
		critChance: derived.critChance.value,
		critMultiplier: derived.critMultiplier.value,
		damageReduction: derived.damageReduction.value,
		healingMultiplier: derived.healingMultiplier.value,
		damageAffinities: derived.damageAffinities,
		damageModifiers: derived.damageModifiers.map(({ modifier }) => modifier),
	};
}
