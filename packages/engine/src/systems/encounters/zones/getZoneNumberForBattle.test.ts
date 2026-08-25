import { describe, expect, it } from "vitest";

import { getZoneNumberForBattle } from "./getZoneNumberForBattle";

describe("getZoneNumberForBattle", () => {
	it.each([
		[1, 1],
		[10, 1],
		[11, 2],
		[100, 10],
		[101, 11],
		[110, 11],
		[111, 12],
		[200, 20],
		[201, 21],
	] as const)("maps battle %i to cumulative zone %i", (battleNumber, zoneNumber) => {
		expect(getZoneNumberForBattle(battleNumber)).toBe(zoneNumber);
	});
});
