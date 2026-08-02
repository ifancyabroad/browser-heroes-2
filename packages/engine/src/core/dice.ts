import { dice, type Dice, type DiceFormula } from "@app/content";
import { randomInt, type RngResult, type RngState } from "./rng";

type ExtractDieSides<T extends string> = T extends `d${infer Sides extends number}` ? Sides : never;

export type DieSides = ExtractDieSides<Dice>;

export type ParsedDiceFormula = {
	count: number;
	sides: DieSides;
	modifier: number;
};

export type DieRoll = {
	sides: DieSides;
	value: number;
};

export type DiceRoll = ParsedDiceFormula & {
	rolls: number[];
	rollTotal: number;
	total: number;
};

export type D20Roll = {
	roll: number;
	isNaturalOne: boolean;
	isNaturalTwenty: boolean;
};

export type D20RollMode = "normal" | "advantage" | "disadvantage";

export type D20RollSelection = {
	roll: D20Roll;
	rolls: D20Roll[];
	mode: D20RollMode;
};

export function combineD20RollModes(modes: readonly D20RollMode[]): D20RollMode {
	const hasAdvantage = modes.includes("advantage");
	const hasDisadvantage = modes.includes("disadvantage");

	if (hasAdvantage === hasDisadvantage) {
		return "normal";
	}

	return hasAdvantage ? "advantage" : "disadvantage";
}

const supportedDieSides = new Set<number>(dice.map((die) => Number(die.slice(1))));

export function parseDiceFormula(formula: DiceFormula): ParsedDiceFormula {
	const match = /^([1-9]\d*)d(\d+)([+-]\d+)?$/.exec(formula);

	if (!match) {
		throw new Error(`Invalid dice formula: ${formula}`);
	}

	const count = Number(match[1]);
	const sides = Number(match[2]);
	const modifier = Number(match[3] ?? 0);

	if (!isDieSides(sides)) {
		throw new Error(`Unsupported die size: d${sides}`);
	}

	return {
		count,
		sides,
		modifier,
	};
}

export function addDiceFormulaModifier(formula: DiceFormula, modifier: number): DiceFormula {
	if (!Number.isInteger(modifier)) {
		throw new Error(`Dice formula modifier must be an integer: ${modifier}`);
	}

	if (modifier === 0) {
		return formula;
	}

	const parsed = parseDiceFormula(formula);
	const combinedModifier = parsed.modifier + modifier;

	const modifierSuffix =
		combinedModifier === 0
			? ""
			: combinedModifier > 0
				? `+${combinedModifier}`
				: `${combinedModifier}`;

	return `${parsed.count}d${parsed.sides}${modifierSuffix}`;
}

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

export function rollDice(rngState: RngState, formula: DiceFormula): RngResult<DiceRoll> {
	const parsed = parseDiceFormula(formula);

	let nextRngState = rngState;
	const rolls: number[] = [];

	for (let index = 0; index < parsed.count; index += 1) {
		const result = rollDie(nextRngState, parsed.sides);

		rolls.push(result.value.value);
		nextRngState = result.rngState;
	}

	const rollTotal = rolls.reduce((total, roll) => total + roll, 0);

	return {
		value: {
			...parsed,
			rolls,
			rollTotal,
			total: rollTotal + parsed.modifier,
		},
		rngState: nextRngState,
	};
}

export function getMaximumDiceValue(formula: DiceFormula): number {
	const { count, sides, modifier } = parseDiceFormula(formula);

	return count * sides + modifier;
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

export function rollD20WithMode(
	rngState: RngState,
	mode: D20RollMode,
): RngResult<D20RollSelection> {
	const firstRoll = rollD20(rngState);

	if (mode === "normal") {
		return {
			value: {
				roll: firstRoll.value,
				rolls: [firstRoll.value],
				mode,
			},
			rngState: firstRoll.rngState,
		};
	}

	const secondRoll = rollD20(firstRoll.rngState);
	const selectFirst =
		mode === "advantage"
			? firstRoll.value.roll >= secondRoll.value.roll
			: firstRoll.value.roll <= secondRoll.value.roll;

	return {
		value: {
			roll: selectFirst ? firstRoll.value : secondRoll.value,
			rolls: [firstRoll.value, secondRoll.value],
			mode,
		},
		rngState: secondRoll.rngState,
	};
}

function isDieSides(value: number): value is DieSides {
	return supportedDieSides.has(value);
}
