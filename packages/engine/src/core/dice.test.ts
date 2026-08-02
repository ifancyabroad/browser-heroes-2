import { describe, expect, it } from "vitest";
import {
	combineD20RollModes,
	addDiceFormulaModifier,
	getMaximumDiceValue,
	parseDiceFormula,
	rollD20WithMode,
	rollDice,
} from "./dice";

describe("combineD20RollModes", () => {
	it.each([
		[[], "normal"],
		[["normal"], "normal"],
		[["advantage"], "advantage"],
		[["disadvantage"], "disadvantage"],
		[["advantage", "disadvantage"], "normal"],
		[["advantage", "advantage", "disadvantage"], "normal"],
	] as const)("combines %j as %s", (modes, expected) => {
		expect(combineD20RollModes(modes)).toBe(expected);
	});
});

describe("dice formulas", () => {
	it.each([
		["1d6", { count: 1, sides: 6, modifier: 0 }],
		["2d8+3", { count: 2, sides: 8, modifier: 3 }],
		["3d10-2", { count: 3, sides: 10, modifier: -2 }],
	] as const)("parses %s", (formula, expected) => {
		expect(parseDiceFormula(formula)).toEqual(expected);
	});

	it("rejects malformed and unsupported formulas", () => {
		expect(() => parseDiceFormula("d6" as "1d6")).toThrow("Invalid dice formula");
		expect(() => parseDiceFormula("1d7" as "1d6")).toThrow("Unsupported die size");
	});

	it.each([
		["1d6", 0, "1d6"],
		["1d6", 2, "1d6+2"],
		["2d8+3", -3, "2d8"],
		["2d8-1", -2, "2d8-3"],
	] as const)("adds %i to %s", (formula, modifier, expected) => {
		expect(addDiceFormulaModifier(formula, modifier)).toBe(expected);
	});

	it("rejects non-integer formula modifiers", () => {
		expect(() => addDiceFormulaModifier("1d6", 0.5)).toThrow(
			"Dice formula modifier must be an integer",
		);
	});

	it.each([
		["1d6", 6],
		["2d8+3", 19],
		["3d4-2", 10],
	] as const)("calculates the maximum of %s", (formula, expected) => {
		expect(getMaximumDiceValue(formula)).toBe(expected);
	});
});

describe("dice rolls", () => {
	it("is deterministic for identical RNG state", () => {
		expect(rollDice({ value: 123 }, "2d6+1")).toEqual(rollDice({ value: 123 }, "2d6+1"));
	});

	it("selects the higher roll with advantage and lower with disadvantage", () => {
		const advantage = rollD20WithMode({ value: 0 }, "advantage");
		const disadvantage = rollD20WithMode({ value: 0 }, "disadvantage");
		const values = advantage.value.rolls.map((roll) => roll.roll);

		expect(advantage.value.roll.roll).toBe(Math.max(...values));
		expect(disadvantage.value.roll.roll).toBe(
			Math.min(...disadvantage.value.rolls.map((roll) => roll.roll)),
		);
		expect(advantage.value.rolls).toHaveLength(2);
		expect(disadvantage.value.rolls).toHaveLength(2);
	});
});
