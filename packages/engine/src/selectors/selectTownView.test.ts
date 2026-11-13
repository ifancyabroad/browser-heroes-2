import { describe, expect, it } from "vitest";
import { createTestTownState } from "../test/createTestRunState";
import { selectTownView } from "./selectTownView";

describe("selectTownView", () => {
	it.each([
		[2, 2],
		[9, 9],
		[10, 10],
		[11, 1],
		[100, 10],
		[101, 1],
		[110, 10],
	])("projects battle %i as zone battle %i", (battleNumber, zoneBattleNumber) => {
		const state = createTestTownState();
		state.battleNumber = battleNumber;
		state.zoneNumber = Math.ceil(battleNumber / 10);
		state.endlessCycle = Math.floor((battleNumber - 1) / 100);

		expect(selectTownView(state)).toMatchObject({
			battleNumber,
			zoneBattleNumber,
			battlesPerZone: 10,
		});
	});
});
