import type { Attribute, DamageType, DiceFormula } from "@app/content";

import type { CombatantState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { getAttributeModifier } from "../checks/getAttributeModifier";
import { applyDamageAffinity, getDamageAffinity, type DamageAffinity } from "./damageAffinity";

import { rollDamageDice, type DamageRollSummary } from "./rollDamageDice";

export type DamageResult = {
	amount: number;
	damageType: DamageType;
	roll: DamageRollSummary;
	abilityModifier: number;
	affinity: DamageAffinity;
};

type CalculateDamageInput = {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	dice: DiceFormula;
	damageType: DamageType;
	attribute?: Attribute;
	critical?: boolean;
};

export function calculateDamage(input: CalculateDamageInput): RngResult<DamageResult> {
	const roll = rollDamageDice({
		rngState: input.rngState,
		formula: input.dice,
		critical: input.critical,
	});

	const abilityModifier = input.attribute
		? getAttributeModifier(input.attacker, input.attribute)
		: 0;

	const baseAmount = roll.value.total + abilityModifier;

	const affinity = getDamageAffinity(input.defender, input.damageType);

	const modifiedAmount = applyDamageAffinity(baseAmount, affinity);

	const amount = applyMinimumDamage(modifiedAmount, affinity);

	return {
		value: {
			amount,
			damageType: input.damageType,
			roll: roll.value,
			abilityModifier,
			affinity,
		},
		rngState: roll.rngState,
	};
}

function applyMinimumDamage(amount: number, affinity: DamageAffinity): number {
	return affinity === "immune" ? 0 : Math.max(1, amount);
}
