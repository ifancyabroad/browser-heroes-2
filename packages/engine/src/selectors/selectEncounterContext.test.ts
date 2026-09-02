import { describe, expect, it } from "vitest";
import { selectEncounterContext } from "./selectEncounterContext";

describe("selectEncounterContext", () => {
	it.each([
		[91, 10],
		[100, 10],
		[101, 11],
		[145, 15],
	] as const)(
		"uses battle %i's cumulative zone as ghost encounter level %i",
		(battleNumber, ghostEncounterLevel) => {
			expect(selectEncounterContext(battleNumber).ghostEncounterLevel).toBe(
				ghostEncounterLevel,
			);
		},
	);
});
