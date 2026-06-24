import type { Attribute, DamageType, DiceFormula } from "@app/content";

import type { CombatantState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { getAttributeModifier } from "../checks/getAttributeModifier";
import { applyDamageAffinity, getDamageAffinity, type DamageAffinity } from "./damageAffinity";

import { rollDamageDice, type DamageRollSummary } from "./rollDamageDice";
import { applyDamageModifiers } from "./applyDamageModifiers";
import { applyDamageReduction } from "./applyDamageReduction";

export type DamageResult = {
	amount: number;
	damageType: DamageType;
	roll: DamageRollSummary;
	abilityModifier: number;
	modifiedBaseAmount: number;
	affinity: DamageAffinity;
	damageReduction: number;
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

	const attackerModifiedAmount = applyDamageModifiers({
		baseAmount,
		damageType: input.damageType,
		modifiers: input.attacker.combatStats.damageModifiers,
	});

	const affinity = getDamageAffinity(input.defender, input.damageType);

	const affinityModifiedAmount = applyDamageAffinity(attackerModifiedAmount, affinity);

	const damageReduction = input.defender.combatStats.damageReduction;

	const amount = applyDamageReduction(affinityModifiedAmount, damageReduction);

	return {
		value: {
			amount,
			damageType: input.damageType,
			roll: roll.value,
			abilityModifier,
			modifiedBaseAmount: attackerModifiedAmount,
			affinity,
			damageReduction,
		},
		rngState: roll.rngState,
	};
}
