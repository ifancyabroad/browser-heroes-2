import { describe, expect, it } from "vitest";
import { adjustCurrentHpForMaxHpChange } from "./adjustCurrentHpForMaxHpChange";

describe("adjustCurrentHpForMaxHpChange", () => {
	it.each([
		[10, 5, 15],
		[10, -5, 5],
		[2, -10, 1],
		[0, 10, 0],
		[-1, 10, 0],
	] as const)("adjusts %i HP by %i to %i", (currentHp, delta, expected) => {
		expect(adjustCurrentHpForMaxHpChange(currentHp, delta)).toBe(expected);
	});
});
