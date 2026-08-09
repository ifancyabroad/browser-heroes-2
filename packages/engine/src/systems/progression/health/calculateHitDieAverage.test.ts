import { describe, expect, it } from "vitest";
import { calculateHitDieAverage } from "./calculateHitDieAverage";

describe("calculateHitDieAverage", () => {
	it.each([
		["1d6", 4],
		["1d10", 6],
		["1d20", 11],
		["2d6", 7],
		["1d8+2", 7],
	] as const)("calculates the rounded average of %s", (hitDie, expected) => {
		expect(calculateHitDieAverage(hitDie)).toBe(expected);
	});
});
