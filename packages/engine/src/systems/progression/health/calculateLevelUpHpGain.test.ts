import { describe, expect, it } from "vitest";
import { calculateLevelUpHpGain } from "./calculateLevelUpHpGain";

describe("calculateLevelUpHpGain", () => {
	it.each([
		["1d10", 16, 9],
		["1d6", 10, 4],
		["1d6", 1, 1],
	] as const)("calculates gain for %s and constitution %i", (hitDie, constitution, expected) => {
		expect(calculateLevelUpHpGain(hitDie, constitution)).toBe(expected);
	});
});
