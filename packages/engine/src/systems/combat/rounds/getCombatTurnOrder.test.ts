import { describe, expect, it } from "vitest";
import type { CombatState, CombatantSide, ActiveStatusEffect } from "../../../schemas";
import { createTestCombat } from "../../../test/createTestCombat";
import { getCombatTurnOrder } from "./getCombatTurnOrder";

function createHaste(combat: CombatState, side: CombatantSide): ActiveStatusEffect {
	return {
		id: side + "-haste",
		type: "status",
		statusId: "haste",
		sourceCombatantId: combat[side].id,
		sourceSide: side,
		source: {
			type: "consumable",
			consumableId: "speedPotion",
			sourceName: "Potion of Speed",
			sourceEffectKey: "effect:0",
		},
		duration: { unit: "battles", remaining: 1 },
	};
}
describe("getCombatTurnOrder", () => {
	it("uses Initiative if both combatants have priority, and supports enemy priority", () => {
		const combat = createTestCombat();
		combat.enemy.combatStats.initiative = 10000;
		combat.player.activeEffects = [createHaste(combat, "player")];
		expect(getCombatTurnOrder(combat)).toEqual(["player", "enemy"]);
		const effect = combat.player.activeEffects[0];
		combat.enemy.activeEffects = [
			{
				...effect,
				id: "enemy-speed",
				sourceCombatantId: combat.enemy.id,
				sourceSide: "enemy",
			},
		];
		expect(getCombatTurnOrder(combat)).toEqual(["enemy", "player"]);
		combat.enemy.combatStats.initiative = combat.player.combatStats.initiative;
		expect(getCombatTurnOrder(combat)).toEqual(["player", "enemy"]);
		combat.player.activeEffects = [];
		combat.player.combatStats.initiative = 100;
		expect(getCombatTurnOrder(combat)).toEqual(["enemy", "player"]);
	});
});
