import { describe, expect, it } from "vitest";
import {
	createTestRunState,
	createTestTownState,
	createTestVictoryState,
	modifyTestRunState,
} from "../test/createTestRunState";
import { selectCombatView } from "./selectCombatView";

describe("selectCombatView", () => {
	it("projects active and victory states", () => {
		expect(selectCombatView(createTestRunState())).toMatchObject({
			isActive: true,
			isVictory: false,
			isDefeat: false,
			canLeaveVictory: false,
		});
		expect(selectCombatView(createTestVictoryState())).toMatchObject({
			isActive: false,
			isVictory: true,
			canLeaveVictory: true,
		});
	});

	it("retains the final combat for dead runs and returns null in town", () => {
		const dead = modifyTestRunState(createTestRunState(), (draft) => {
			draft.phase = "dead";
			draft.combat!.status = "enemy_won";
			draft.combat!.player.currentHp = 0;
		});

		expect(selectCombatView(dead)).toMatchObject({ isDefeat: true });
		expect(selectCombatView(createTestTownState())).toBeNull();
	});
});
