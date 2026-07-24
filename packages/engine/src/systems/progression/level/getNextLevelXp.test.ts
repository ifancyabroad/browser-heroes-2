import { describe, expect, it } from "vitest";
import { getNextLevelXp } from "./getNextLevelXp";

describe("getNextLevelXp", () => {
	it.each([
		[1, 50],
		[2, 1_000],
		[9, 100_000],
		[10, null],
		[11, null],
	] as const)("returns the next threshold after level %i", (level, expected) => {
		expect(getNextLevelXp(level)).toBe(expected);
	});
});
