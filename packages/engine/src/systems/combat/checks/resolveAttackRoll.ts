import type { Attribute, RollMode } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import {
	combineD20RollModes,
	rollD20WithMode,
	type D20Roll,
	type D20RollMode,
} from "../../../core/dice";

import { getAttributeModifier } from "./getAttributeModifier";

import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import { getEffectiveRollMode } from "../effects/getEffectiveRollMode";
import { calculateBaseProficiencyBonus } from "../rules/calculateBaseProficiencyBonus";

export type AttackRollResult = {
	roll: D20Roll;
	rolls: D20Roll[];
	rollMode: D20RollMode;
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
	rollMode?: RollMode;
};

export function resolveAttackRoll(input: ResolveAttackRollInput): RngResult<AttackRollResult> {
	const rollMode = combineD20RollModes([
		getEffectiveRollMode(input.attacker, "attack"),
		input.rollMode ?? "normal",
	]);
	const rollResult = rollD20WithMode(input.rngState, rollMode);
	const roll = rollResult.value.roll;

	const attributeModifier = getAttributeModifier(input.attacker, input.attribute);

	const proficiencyBonus = input.proficient
		? calculateBaseProficiencyBonus(input.attacker.level)
		: 0;

	const attackRollBonus = getEffectiveCombatStatValue(input.attacker, "attackRollBonus");

	const total = roll.roll + attributeModifier + proficiencyBonus + attackRollBonus;

	const targetArmourClass = getEffectiveCombatStatValue(input.defender, "armourClass");

	const criticalRangeBonus = getEffectiveCombatStatValue(input.attacker, "criticalRangeBonus");
	const criticalThreshold = 20 - criticalRangeBonus;
	const critical = roll.isNaturalTwenty || (!roll.isNaturalOne && roll.roll >= criticalThreshold);

	const hit = critical || (!roll.isNaturalOne && total >= targetArmourClass);

	return {
		value: {
			roll,
			rolls: rollResult.value.rolls,
			rollMode,
			attribute: input.attribute,
			attributeModifier,
			proficiencyBonus,
			attackRollBonus,
			total,
			targetArmourClass,
			hit,
			critical,
		},
		rngState: rollResult.rngState,
	};
}
