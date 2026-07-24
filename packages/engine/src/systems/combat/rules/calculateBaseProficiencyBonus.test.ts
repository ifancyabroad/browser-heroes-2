import { describe, expect, it } from "vitest";
import { calculateBaseProficiencyBonus } from "./calculateBaseProficiencyBonus";

describe("calculateBaseProficiencyBonus", () => {
	it.each([
		[-1, 2],
		[1, 2],
		[4, 2],
		[5, 3],
		[8, 3],
		[9, 4],
		[20, 6],
	] as const)("maps level %i to proficiency %i", (level, expected) => {
		expect(calculateBaseProficiencyBonus(level)).toBe(expected);
	});
});
