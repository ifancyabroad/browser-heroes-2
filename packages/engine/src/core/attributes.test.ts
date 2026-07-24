import { describe, expect, it } from "vitest";
import { calculateAttributeModifier } from "./attributes";

describe("calculateAttributeModifier", () => {
	it.each([
		[1, -5],
		[8, -1],
		[9, -1],
		[10, 0],
		[11, 0],
		[12, 1],
		[18, 4],
		[20, 5],
	] as const)("maps score %i to modifier %i", (score, expected) => {
		expect(calculateAttributeModifier(score)).toBe(expected);
	});
});
