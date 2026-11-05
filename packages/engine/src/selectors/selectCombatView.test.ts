import { describe, expect, it } from "vitest";
import {
	createTestRunState,
	createTestTownState,
	createTestVictoryState,
	modifyTestRunState,
} from "../test/createTestRunState";
import { selectCombatView } from "./selectCombatView";

describe("selectCombatView", () => {
	it.each([
		[9, ["player", "enemy"]],
		[10, ["player", "enemy"]],
		[11, ["enemy", "player"]],
	] as const)("projects turn order against enemy Initiative %i", (initiative, order) => {
		const state = createTestRunState();
		const combat = state.combat!;
		combat.player.combatStats.initiative = 10;
		combat.enemy.combatStats.initiative = initiative;
		combat.enemy.shortName = "Rotfang";

		expect(selectCombatView(state)?.turnOrder).toEqual(
			order.map((side) => ({
				id: combat[side].id,
				shortName: combat[side].shortName,
			})),
		);
	});

	it("uses effective Initiative for ordering after combat too", () => {
		const state = createTestVictoryState();
		const combat = state.combat!;
		combat.player.combatStats.initiative = 10;
		combat.enemy.combatStats.initiative = 9;
		combat.enemy.activeEffects.push({
			id: "initiative-buff",
			type: "modifyStat",
			stat: "initiative",
			value: 5,
			sourceCombatantId: combat.enemy.id,
			sourceSide: "enemy",
			source: { type: "skill", skillId: "armour", sourceName: "Test", sourceEffectKey: "0" },
			duration: { unit: "turns", remaining: 1 },
		});

		expect(selectCombatView(state)?.turnOrder).toEqual([
			{ id: combat.enemy.id, shortName: combat.enemy.shortName },
			{ id: combat.player.id, shortName: combat.player.shortName },
		]);
	});

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
