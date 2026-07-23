import type { Attribute } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { rollD20, type D20Roll } from "../../../core/dice";

import { getAttributeModifier } from "./getAttributeModifier";

import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import { calculateBaseProficiencyBonus } from "../rules/calculateBaseProficiencyBonus";

export type AttackRollResult = {
	roll: D20Roll;
	attribute: Attribute;
	attributeModifier: number;
	proficiencyBonus: number;
	attackRollBonus: number;
	total: number;
	targetArmourClass: number;
	hit: boolean;
	critical: boolean;
};

type ResolveAttackRollInput = {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	attribute: Attribute;
	proficient: boolean;
};

export function resolveAttackRoll(input: ResolveAttackRollInput): RngResult<AttackRollResult> {
	const roll = rollD20(input.rngState);

	const attributeModifier = getAttributeModifier(input.attacker, input.attribute);

	const proficiencyBonus = input.proficient
		? calculateBaseProficiencyBonus(input.attacker.level)
		: 0;

	const attackRollBonus = getEffectiveCombatStatValue(input.attacker, "attackRollBonus");

	const total = roll.value.roll + attributeModifier + proficiencyBonus + attackRollBonus;

	const targetArmourClass = getEffectiveCombatStatValue(input.defender, "armourClass");

	const criticalRangeBonus = getEffectiveCombatStatValue(input.attacker, "criticalRangeBonus");
	const criticalThreshold = 20 - criticalRangeBonus;
	const critical =
		roll.value.isNaturalTwenty ||
		(!roll.value.isNaturalOne && roll.value.roll >= criticalThreshold);

	const hit = critical || (!roll.value.isNaturalOne && total >= targetArmourClass);

	return {
		value: {
			roll: roll.value,
			attribute: input.attribute,
			attributeModifier,
			proficiencyBonus,
			attackRollBonus,
			total,
			targetArmourClass,
			hit,
			critical,
		},
		rngState: roll.rngState,
	};
}
