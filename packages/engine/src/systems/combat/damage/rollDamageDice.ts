import type { DiceFormula } from "@app/content";

import { parseDiceFormula, rollDie, type ParsedDiceFormula } from "../../../core/dice";

import type { RngResult, RngState } from "../../../core/rng";

export type DamageRollSummary = {
	formula: DiceFormula;
	rolls: number[];
	rollTotal: number;
	formulaModifier: number;
	total: number;
	critical: boolean;
};

type RollDamageDiceInput = {
	rngState: RngState;
	formula: DiceFormula;
	critical?: boolean;
};

export function rollDamageDice(input: RollDamageDiceInput): RngResult<DamageRollSummary> {
	const critical = input.critical ?? false;
	const parsed = parseDiceFormula(input.formula);

	const rollCount = critical ? parsed.count * 2 : parsed.count;

	let nextRngState = input.rngState;
	const rolls: number[] = [];

	for (let index = 0; index < rollCount; index += 1) {
		const result = rollDie(nextRngState, parsed.sides);

		rolls.push(result.value.value);
		nextRngState = result.rngState;
	}

	const rollTotal = rolls.reduce((total, roll) => total + roll, 0);

	return {
		value: createDamageRollSummary({
			formula: input.formula,
			parsed,
			rolls,
			rollTotal,
			critical,
		}),
		rngState: nextRngState,
	};
}

function createDamageRollSummary(input: {
	formula: DiceFormula;
	parsed: ParsedDiceFormula;
	rolls: number[];
	rollTotal: number;
	critical: boolean;
}): DamageRollSummary {
	return {
		formula: input.formula,
		rolls: input.rolls,
		rollTotal: input.rollTotal,
		formulaModifier: input.parsed.modifier,
		total: input.rollTotal + input.parsed.modifier,
		critical: input.critical,
	};
}
