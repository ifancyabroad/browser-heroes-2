import type { Attribute } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { rollD20, type D20Roll } from "../../../core/dice";

import { getAttributeModifier } from "./getAttributeModifier";

export type AttackRollResult = {
	roll: D20Roll;
	attribute: Attribute;
	attributeModifier: number;
	proficiencyBonus: number;
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

	const proficiencyBonus = input.proficient ? input.attacker.combatStats.proficiencyBonus : 0;

	const total = roll.value.roll + attributeModifier + proficiencyBonus;

	const targetArmourClass = input.defender.combatStats.armourClass;

	const critical = roll.value.isNaturalTwenty;

	const hit = critical || (!roll.value.isNaturalOne && total >= targetArmourClass);

	return {
		value: {
			roll: roll.value,
			attribute: input.attribute,
			attributeModifier,
			proficiencyBonus,
			total,
			targetArmourClass,
			hit,
			critical,
		},
		rngState: roll.rngState,
	};
}
