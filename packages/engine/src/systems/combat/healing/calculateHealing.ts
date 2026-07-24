import type { Attribute, DiceFormula } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { getAttributeModifier } from "../checks/getAttributeModifier";
import { getEffectiveHealingMultiplier } from "../effects/getEffectiveHealingMultiplier";
import { rollDamageDice } from "../damage/rollDamageDice";

export type HealingResult = {
	amount: number;
	rollTotal: number;
	attributeModifier: number;
	baseAmount: number;
	healingMultiplier: number;
};

type CalculateHealingInput = {
	rngState: RngState;
	healer: CombatantState;
	dice: DiceFormula;
	attribute?: Attribute;
};

export function calculateHealing(input: CalculateHealingInput): RngResult<HealingResult> {
	const roll = rollDamageDice({
		rngState: input.rngState,
		formula: input.dice,
	});

	const attributeModifier = input.attribute
		? getAttributeModifier(input.healer, input.attribute)
		: 0;

	const baseAmount = Math.max(0, roll.value.total + attributeModifier);

	const healingMultiplier = getEffectiveHealingMultiplier(input.healer);

	const amount = Math.max(0, Math.floor(baseAmount * healingMultiplier));

	return {
		value: {
			amount,
			rollTotal: roll.value.total,
			attributeModifier,
			baseAmount,
			healingMultiplier,
		},
		rngState: roll.rngState,
	};
}
