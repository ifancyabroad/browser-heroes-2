import { describe, expect, it } from "vitest";
import { calculateGoldMultiplier } from "./calculateGoldMultiplier";

describe("calculateGoldMultiplier", () => {
	it.each([
		[-1, 1],
		[0, 1],
		[1, 1.25],
		[5, 2.25],
	] as const)("maps streak %i to multiplier %f", (streak, expected) => {
		expect(calculateGoldMultiplier(streak)).toBe(expected);
	});
});
