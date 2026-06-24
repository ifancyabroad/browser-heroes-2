import type { DamageAffinities, PassiveDamageModifier } from "@app/content";

import type { CombatantCombatStats } from "../../../schemas";
import { applyPassiveDamageAffinities } from "./applyDamageAffinityModifiers";
import { applyPassiveStatModifiers, type CombatModifier } from "./applyStatModifiers";

type BuildCombatStatsInput = {
	baseArmourClass: number;
	baseProficiencyBonus: number;
	baseDamageAffinities: DamageAffinities;
	passiveModifiers: readonly CombatModifier[];
};

export function buildCombatStats(input: BuildCombatStatsInput): CombatantCombatStats {
	const { passiveModifiers } = input;

	return {
		armourClass: resolveNonNegativeIntegerStat(
			"armourClass",
			input.baseArmourClass,
			passiveModifiers,
		),

		proficiencyBonus: resolveNonNegativeIntegerStat(
			"proficiencyBonus",
			input.baseProficiencyBonus,
			passiveModifiers,
		),

		attackRollBonus: applyPassiveStatModifiers("attackRollBonus", 0, passiveModifiers),

		savingThrowBonus: applyPassiveStatModifiers("savingThrowBonus", 0, passiveModifiers),

		saveDcBonus: applyPassiveStatModifiers("saveDcBonus", 0, passiveModifiers),

		critChance: applyPassiveStatModifiers("critChance", 0, passiveModifiers),

		critMultiplier: applyPassiveStatModifiers("critMultiplier", 2, passiveModifiers),

		damageReduction: applyPassiveStatModifiers("damageReduction", 0, passiveModifiers),

		healingMultiplier: applyPassiveStatModifiers("healingMultiplier", 1, passiveModifiers),

		damageAffinities: applyPassiveDamageAffinities(
			input.baseDamageAffinities,
			passiveModifiers,
		),

		damageModifiers: passiveModifiers.filter(
			(modifier): modifier is PassiveDamageModifier => modifier.type === "modifyDamage",
		),
	};
}

function resolveNonNegativeIntegerStat(
	stat: "armourClass" | "proficiencyBonus",
	baseValue: number,
	modifiers: readonly CombatModifier[],
): number {
	return Math.max(0, Math.floor(applyPassiveStatModifiers(stat, baseValue, modifiers)));
}
