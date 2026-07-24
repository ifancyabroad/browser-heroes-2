import { describe, expect, it } from "vitest";
import { getZoneNumberForBattle } from "./getZoneNumberForBattle";

describe("getZoneNumberForBattle", () => {
	it.each([
		[1, 1],
		[10, 1],
		[11, 2],
		[90, 9],
		[100, 10],
		[101, 1],
		[111, 2],
	] as const)("maps battle %i to zone %i", (battleNumber, expected) => {
		expect(getZoneNumberForBattle(battleNumber)).toBe(expected);
	});
});
