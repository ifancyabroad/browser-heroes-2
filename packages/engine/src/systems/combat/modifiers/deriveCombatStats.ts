import type { DamageAffinities } from "@app/content";

import type { CombatantCombatStats } from "../../../schemas";

import { deriveDamageAffinities, toDamageAffinities } from "./deriveDamageAffinities";
import {
	deriveDamageModifiers,
	deriveDamageTakenModifiers,
	toCombatantDamageModifiers,
} from "./deriveDamageModifiers";
import type {
	DerivedDamageAffinities,
	DerivedDamageModifier,
	DerivedValue,
	ResolvedModifier,
} from "./modifier.types";
import { resolveAdditiveStat } from "./resolveAdditiveStat";
import { resolveHealingMultiplier } from "./resolveHealingMultiplier";

export type DerivedCombatStats = {
	armourClass: DerivedValue;
	attackRollBonus: DerivedValue;
	savingThrowBonus: DerivedValue;
	saveDcBonus: DerivedValue;
	criticalRangeBonus: DerivedValue;
	criticalDiceMultiplierBonus: DerivedValue;
	healingMultiplier: DerivedValue;
	maxHpBonus: DerivedValue;
	damageAffinities: DerivedDamageAffinities;
	damageModifiers: DerivedDamageModifier[];
	damageTakenModifiers: DerivedDamageModifier[];
};

type DeriveCombatStatsInput = {
	baseArmourClass: number;
	baseDamageAffinities: DamageAffinities;
	modifiers: readonly ResolvedModifier[];
};

export function deriveCombatStats(input: DeriveCombatStatsInput): DerivedCombatStats {
	const { modifiers } = input;

	return {
		armourClass: resolveNonNegativeIntegerStat("armourClass", input.baseArmourClass, modifiers),

		attackRollBonus: resolveAdditiveStat("attackRollBonus", 0, modifiers),

		savingThrowBonus: resolveAdditiveStat("savingThrowBonus", 0, modifiers),

		saveDcBonus: resolveAdditiveStat("saveDcBonus", 0, modifiers),

		criticalRangeBonus: resolveNonNegativeIntegerStat("criticalRangeBonus", 0, modifiers),

		criticalDiceMultiplierBonus: resolveNonNegativeIntegerStat(
			"criticalDiceMultiplierBonus",
			0,
			modifiers,
		),

		healingMultiplier: resolveHealingMultiplier(modifiers),
		maxHpBonus: resolveAdditiveStat("maxHpBonus", 0, modifiers),

		damageAffinities: deriveDamageAffinities(input.baseDamageAffinities, modifiers),

		damageModifiers: deriveDamageModifiers(modifiers),

		damageTakenModifiers: deriveDamageTakenModifiers(modifiers),
	};
}

function resolveNonNegativeIntegerStat(
	stat: "armourClass" | "criticalRangeBonus" | "criticalDiceMultiplierBonus",
	baseValue: number,
	modifiers: readonly ResolvedModifier[],
): DerivedValue {
	const derivedValue = resolveAdditiveStat(stat, baseValue, modifiers);

	return {
		...derivedValue,
		value: Math.max(0, Math.floor(derivedValue.value)),
	};
}

export function toCombatantCombatStats(derived: DerivedCombatStats): CombatantCombatStats {
	return {
		armourClass: derived.armourClass.value,
		attackRollBonus: derived.attackRollBonus.value,
		savingThrowBonus: derived.savingThrowBonus.value,
		saveDcBonus: derived.saveDcBonus.value,
		criticalRangeBonus: derived.criticalRangeBonus.value,
		criticalDiceMultiplierBonus: derived.criticalDiceMultiplierBonus.value,
		healingMultiplier: derived.healingMultiplier.value,
		maxHpBonus: derived.maxHpBonus.value,
		damageAffinities: toDamageAffinities(derived.damageAffinities),
		damageModifiers: toCombatantDamageModifiers(derived.damageModifiers),
		damageTakenModifiers: toCombatantDamageModifiers(derived.damageTakenModifiers),
	};
}
