import { describe, expect, it } from "vitest";
import { getLevelForXp } from "./getLevelForXp";

describe("getLevelForXp", () => {
	it.each([
		[-1, 1],
		[0, 1],
		[49, 1],
		[50, 2],
		[999, 2],
		[1_000, 3],
		[99_999, 9],
		[100_000, 10],
		[1_000_000, 10],
	] as const)("maps %i XP to level %i", (xp, expected) => {
		expect(getLevelForXp(xp)).toBe(expected);
	});

	it("floors fractional XP", () => {
		expect(getLevelForXp(49.9)).toBe(1);
		expect(getLevelForXp(50.9)).toBe(2);
	});
});
