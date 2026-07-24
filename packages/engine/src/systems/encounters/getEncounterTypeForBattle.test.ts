import { describe, expect, it } from "vitest";
import { getEncounterTypeForBattle } from "./getEncounterTypeForBattle";

describe("getEncounterTypeForBattle", () => {
	it.each([
		[1, "standard"],
		[9, "standard"],
		[10, "boss"],
		[11, "standard"],
		[100, "boss"],
	] as const)("classifies battle %i as %s", (battleNumber, expected) => {
		expect(getEncounterTypeForBattle(battleNumber)).toBe(expected);
	});
});
