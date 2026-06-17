import type { Attribute, DamageType, DiceFormula } from "@app/content";
import type { CombatantState } from "../../schemas";
import { parseDiceFormula, rollDie, type ParsedDiceFormula } from "../../core/dice";
import type { RngResult, RngState } from "../../core/rng";
import { getAttributeModifier } from "./checks";

export type DamageRollSummary = {
	formula: DiceFormula;
	rolls: number[];
	rollTotal: number;
	formulaModifier: number;
	total: number;
	critical: boolean;
};

export type DamageResult = {
	amount: number;
	damageType: DamageType;
	roll: DamageRollSummary;
	abilityModifier: number;
	affinity: "normal" | "resistant" | "immune" | "vulnerable";
};

export function calculateDamage(input: {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	dice: DiceFormula;
	damageType: DamageType;
	attribute?: Attribute;
	critical?: boolean;
}): RngResult<DamageResult> {
	const critical = input.critical ?? false;
	const roll = rollDamageDice(input.rngState, input.dice, critical);
	const abilityModifier = input.attribute
		? getAttributeModifier(input.attacker, input.attribute)
		: 0;
	const baseAmount = roll.value.total + abilityModifier;
	const affinity = getDamageAffinity(input.defender, input.damageType);
	const amount = applyDamageMinimum(applyDamageAffinity(baseAmount, affinity), affinity);

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

export function applyDamage(combatant: CombatantState, damage: DamageResult): CombatantState {
	return {
		...combatant,
		currentHp: Math.max(0, combatant.currentHp - damage.amount),
	};
}

export function rollDamageDice(
	rngState: RngState,
	formula: DiceFormula,
	critical: boolean,
): RngResult<DamageRollSummary> {
	const parsed = parseDiceFormula(formula);
	const rollCount = critical ? parsed.count * 2 : parsed.count;
	let nextRngState = rngState;
	const rolls: number[] = [];

	for (let index = 0; index < rollCount; index += 1) {
		const result = rollDie(nextRngState, parsed.sides);

		rolls.push(result.value.value);
		nextRngState = result.rngState;
	}

	const rollTotal = rolls.reduce((total, roll) => total + roll, 0);

	return {
		value: createDamageRollSummary(formula, parsed, rolls, rollTotal, critical),
		rngState: nextRngState,
	};
}

function createDamageRollSummary(
	formula: DiceFormula,
	parsed: ParsedDiceFormula,
	rolls: number[],
	rollTotal: number,
	critical: boolean,
): DamageRollSummary {
	return {
		formula,
		rolls,
		rollTotal,
		formulaModifier: parsed.modifier,
		total: rollTotal + parsed.modifier,
		critical,
	};
}

function applyDamageAffinity(baseAmount: number, affinity: DamageResult["affinity"]): number {
	const integerAmount = Math.max(0, Math.floor(baseAmount));

	switch (affinity) {
		case "immune":
			return 0;
		case "resistant":
			return Math.floor(integerAmount / 2);
		case "vulnerable":
			return integerAmount * 2;
		case "normal":
			return integerAmount;
	}
}

function applyDamageMinimum(amount: number, affinity: DamageResult["affinity"]): number {
	return affinity === "immune" ? 0 : Math.max(1, amount);
}

function getDamageAffinity(
	defender: CombatantState,
	damageType: DamageType,
): DamageResult["affinity"] {
	if (defender.damageAffinities.immunities.includes(damageType)) {
		return "immune";
	}

	if (defender.damageAffinities.vulnerabilities.includes(damageType)) {
		return "vulnerable";
	}

	if (defender.damageAffinities.resistances.includes(damageType)) {
		return "resistant";
	}

	return "normal";
}
