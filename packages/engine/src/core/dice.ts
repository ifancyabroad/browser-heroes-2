import { randomInt, type RngResult, type RngState } from "./rng";

export type DieSides = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export type DieRoll = {
	sides: DieSides;
	value: number;
};

export type DiceRoll = {
	count: number;
	sides: DieSides;
	rolls: number[];
	total: number;
};

export type D20Roll = {
	roll: number;
	isNaturalOne: boolean;
	isNaturalTwenty: boolean;
};

export function rollDie(rngState: RngState, sides: DieSides): RngResult<DieRoll> {
	const result = randomInt(rngState, 1, sides);

	return {
		value: {
			sides,
			value: result.value,
		},
		rngState: result.rngState,
	};
}

export function rollDice(
	rngState: RngState,
	input: {
		count: number;
		sides: DieSides;
	},
): RngResult<DiceRoll> {
	let nextRngState = rngState;
	const rolls: number[] = [];

	for (let i = 0; i < input.count; i += 1) {
		const result = rollDie(nextRngState, input.sides);

		rolls.push(result.value.value);
		nextRngState = result.rngState;
	}

	return {
		value: {
			count: input.count,
			sides: input.sides,
			rolls,
			total: rolls.reduce((sum, value) => sum + value, 0),
		},
		rngState: nextRngState,
	};
}

export function rollD20(rngState: RngState): RngResult<D20Roll> {
	const result = rollDie(rngState, 20);

	return {
		value: {
			roll: result.value.value,
			isNaturalOne: result.value.value === 1,
			isNaturalTwenty: result.value.value === 20,
		},
		rngState: result.rngState,
	};
}

export type D20CheckResult = {
	d20: D20Roll;
	modifier: number;
	total: number;
	target: number;
	success: boolean;
};

export function rollD20Check(
	rngState: RngState,
	input: {
		modifier: number;
		target: number;
	},
): RngResult<D20CheckResult> {
	const d20 = rollD20(rngState);

	const total = d20.value.roll + input.modifier;

	return {
		value: {
			d20: d20.value,
			modifier: input.modifier,
			total,
			target: input.target,
			success: d20.value.isNaturalTwenty || total >= input.target,
		},
		rngState: d20.rngState,
	};
}
