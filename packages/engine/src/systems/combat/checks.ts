import type { Attribute } from "@app/content";
import type { CombatantState } from "../../schemas";
import { calculateAttributeModifier } from "../../core/attributes";
import { rollD20, type D20Roll } from "../../core/dice";
import type { RngResult, RngState } from "../../core/rng";

export type D20Check = {
	roll: D20Roll;
};

export type AttackRollResult = {
	check: D20Check;
	attribute: Attribute;
	attributeModifier: number;
	proficiencyBonus: number;
	total: number;
	targetArmourClass: number;
	hit: boolean;
	critical: boolean;
};

export function resolveAttackRoll(input: {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	attribute: Attribute;
	proficient: boolean;
}): RngResult<AttackRollResult> {
	const roll = rollD20(input.rngState);
	const attributeModifier = getAttributeModifier(input.attacker, input.attribute);
	const proficiencyBonus = input.proficient ? input.attacker.proficiencyBonus : 0;
	const total = roll.value.roll + attributeModifier + proficiencyBonus;
	const targetArmourClass = input.defender.armourClass;
	const critical = roll.value.isNaturalTwenty;
	const hit = critical || (!roll.value.isNaturalOne && total >= targetArmourClass);

	return {
		value: {
			check: {
				roll: roll.value,
			},
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

export function getAttributeModifier(combatant: CombatantState, attribute: Attribute): number {
	return calculateAttributeModifier(combatant.attributes[attribute]);
}
