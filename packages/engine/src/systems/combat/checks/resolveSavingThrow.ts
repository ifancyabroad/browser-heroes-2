import type { SavingThrow } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { rollD20WithMode, type D20Roll, type D20RollMode } from "../../../core/dice";
import { getAttributeModifier } from "./getAttributeModifier";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import { getEffectiveRollMode } from "../effects/getEffectiveRollMode";
import { calculateBaseProficiencyBonus } from "../rules/calculateBaseProficiencyBonus";

export type SavingThrowResult = {
	roll: D20Roll;
	rolls: D20Roll[];
	rollMode: D20RollMode;
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
	const rollMode = getEffectiveRollMode(input.defender, "savingThrow", input.save.attribute);
	const rollResult = rollD20WithMode(input.rngState, rollMode);
	const roll = rollResult.value.roll;

	const attributeModifier = getAttributeModifier(input.defender, input.save.attribute);

	const proficient = input.defender.savingThrowProficiencies.includes(input.save.attribute);

	const proficiencyBonus = proficient ? calculateBaseProficiencyBonus(input.defender.level) : 0;

	const savingThrowBonus = getEffectiveCombatStatValue(input.defender, "savingThrowBonus");

	const total = roll.roll + attributeModifier + proficiencyBonus + savingThrowBonus;

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
			roll,
			rolls: rollResult.value.rolls,
			rollMode,
			attributeModifier,
			proficiencyBonus,
			savingThrowBonus,
			total,
			dc,
			success: total >= dc,
		},
		rngState: rollResult.rngState,
	};
}
