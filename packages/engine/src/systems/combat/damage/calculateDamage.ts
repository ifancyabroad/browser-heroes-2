import type { Attribute, DamageType, DiceFormula } from "@app/content";

import type { CombatantState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { getAttributeModifier } from "../checks/getAttributeModifier";
import { applyDamageAffinity, getDamageAffinity, type DamageAffinity } from "./damageAffinity";

import { rollDamageDice, type DamageRollSummary } from "./rollDamageDice";
import { applyDamageModifiers } from "./applyDamageModifiers";
import { getEffectiveDamageModifiers } from "../effects/getEffectiveDamageModifiers";
import { getEffectiveDamageTakenModifiers } from "../effects/getEffectiveDamageTakenModifiers";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";

export type DamageResult = {
	amount: number;
	damageType: DamageType;
	roll: DamageRollSummary;
	abilityModifier: number;
	modifiedBaseAmount: number;
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
	multiplier?: number;
};

export function calculateDamage(input: CalculateDamageInput): RngResult<DamageResult> {
	const criticalDiceMultiplierBonus = input.critical
		? getEffectiveCombatStatValue(input.attacker, "criticalDiceMultiplierBonus")
		: 0;

	const roll = rollDamageDice({
		rngState: input.rngState,
		formula: input.dice,
		critical: input.critical,
		criticalDiceMultiplierBonus,
	});

	const abilityModifier = input.attribute
		? getAttributeModifier(input.attacker, input.attribute)
		: 0;

	const baseAmount = roll.value.total + abilityModifier;

	const attackerModifiedAmount = applyDamageModifiers({
		baseAmount,
		damageType: input.damageType,
		modifiers: getEffectiveDamageModifiers(input.attacker),
	});

	const multipliedAmount = attackerModifiedAmount * (input.multiplier ?? 1);

	const defenderModifiedAmount = applyDamageModifiers({
		baseAmount: multipliedAmount,
		damageType: input.damageType,
		modifiers: getEffectiveDamageTakenModifiers(input.defender),
	});

	const affinity = getDamageAffinity(input.defender, input.damageType);

	const affinityModifiedAmount = applyDamageAffinity(defenderModifiedAmount, affinity);

	const amount = Math.max(0, affinityModifiedAmount);

	return {
		value: {
			amount,
			damageType: input.damageType,
			roll: roll.value,
			abilityModifier,
			modifiedBaseAmount: attackerModifiedAmount,
			affinity,
		},
		rngState: roll.rngState,
	};
}
