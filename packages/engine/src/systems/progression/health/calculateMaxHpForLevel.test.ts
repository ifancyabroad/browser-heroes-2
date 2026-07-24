import { describe, expect, it } from "vitest";
import { calculateMaxHpForLevel } from "./calculateMaxHpForLevel";

describe("calculateMaxHpForLevel", () => {
	it("uses maximum hit die value at level one", () => {
		expect(calculateMaxHpForLevel("1d10", 16, 1)).toBe(13);
	});

	it("adds average hit die and constitution for later levels", () => {
		expect(calculateMaxHpForLevel("1d10", 16, 3)).toBe(31);
	});

	it("normalises levels below one and guarantees positive gains", () => {
		expect(calculateMaxHpForLevel("1d6", 1, 0)).toBe(1);
		expect(calculateMaxHpForLevel("1d6", 1, 3)).toBe(3);
	});
});
