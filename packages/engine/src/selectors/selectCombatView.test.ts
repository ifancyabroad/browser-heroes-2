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

	it("describes boss and ghost enemies for presentation", () => {
		const boss = modifyTestRunState(createTestRunState(), (draft) => {
			draft.combat!.encounterType = "boss";
		});
		const ghost = modifyTestRunState(createTestRunState(), (draft) => {
			draft.combat!.encounterType = "ghost";
			draft.combat!.ghostUsername = "Ghost Owner";
		});

		expect(selectCombatView(createTestRunState())?.enemyDescriptor).toBeUndefined();
		expect(selectCombatView(boss)?.enemyDescriptor).toBe("Boss");
		expect(selectCombatView(ghost)?.enemyDescriptor).toBe("Ghost Owner");
	});
});
