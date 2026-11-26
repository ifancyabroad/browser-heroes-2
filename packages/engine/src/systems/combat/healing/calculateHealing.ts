import type { Attribute, DiceFormula } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { getAttributeModifier } from "../checks/getAttributeModifier";
import { getEffectiveHealingMultiplier } from "../effects/modifiers/getEffectiveHealingMultiplier";
import { rollDamageDice } from "../damage/rollDamageDice";

type BaseHealingResult = {
	rollTotal: number;
	attributeModifier: number;
	baseAmount: number;
};

export type HealingResult = BaseHealingResult & {
	amount: number;
	healingMultiplier: number;
};

type CalculateHealingInput = {
	rngState: RngState;
	healer: CombatantState;
	dice?: DiceFormula;
	percent?: number;
	attribute?: Attribute;
};

export function calculateHealing(input: CalculateHealingInput): RngResult<HealingResult> {
	const base = calculateBaseHealing(input);
	const healingMultiplier = getEffectiveHealingMultiplier(input.healer);
	const amount = Math.max(0, Math.floor(base.value.baseAmount * healingMultiplier));

	return {
		value: {
			...base.value,
			amount,
			healingMultiplier,
		},
		rngState: base.rngState,
	};
}

function calculateBaseHealing(input: CalculateHealingInput): RngResult<BaseHealingResult> {
	if (input.percent !== undefined) {
		if (input.dice !== undefined || input.attribute !== undefined) {
			throw new Error("Percentage healing cannot use dice or attributes");
		}
		return {
			value: {
				baseAmount: Math.round(input.healer.maxHp * input.percent),
				rollTotal: 0,
				attributeModifier: 0,
			},
			rngState: input.rngState,
		};
	}

	if (input.dice === undefined) {
		throw new Error("Healing requires dice or percent");
	}
	const roll = rollDamageDice({ rngState: input.rngState, formula: input.dice });
	const attributeModifier = input.attribute
		? getAttributeModifier(input.healer, input.attribute)
		: 0;
	return {
		value: {
			baseAmount: Math.max(0, roll.value.total + attributeModifier),
			rollTotal: roll.value.total,
			attributeModifier,
		},
		rngState: roll.rngState,
	};
}
