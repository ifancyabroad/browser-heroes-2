import type { SavingThrow } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { rollD20, type D20Roll } from "../../../core/dice";
import { getAttributeModifier } from "./getAttributeModifier";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import { calculateBaseProficiencyBonus } from "../rules/calculateBaseProficiencyBonus";

export type SavingThrowResult = {
	roll: D20Roll;
	attributeModifier: number;
	proficiencyBonus: number;
	savingThrowBonus: number;
	total: number;
	dc: number;
	success: boolean;
};

type ResolveSavingThrowInput = {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	save: SavingThrow;
};

export function resolveSavingThrow(input: ResolveSavingThrowInput): RngResult<SavingThrowResult> {
	const roll = rollD20(input.rngState);

	const attributeModifier = getAttributeModifier(input.defender, input.save.attribute);

	const proficient = input.defender.savingThrowProficiencies.includes(input.save.attribute);

	const proficiencyBonus = proficient ? calculateBaseProficiencyBonus(input.defender.level) : 0;

	const savingThrowBonus = getEffectiveCombatStatValue(input.defender, "savingThrowBonus");

	const total = roll.value.roll + attributeModifier + proficiencyBonus + savingThrowBonus;

	const dc =
		input.save.dc.base +
		getAttributeModifier(input.attacker, input.save.dc.attribute) +
		(input.save.dc.includeProficiency
			? calculateBaseProficiencyBonus(input.attacker.level)
			: 0) +
		getEffectiveCombatStatValue(input.attacker, "saveDcBonus") +
		input.save.dc.bonus;

	return {
		value: {
			roll: roll.value,
			attributeModifier,
			proficiencyBonus,
			savingThrowBonus,
			total,
			dc,
			success: total >= dc,
		},
		rngState: roll.rngState,
	};
}
