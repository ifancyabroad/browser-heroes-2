import { describe, expect, it } from "vitest";
import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { createTestCombatState } from "../../../test/createTestRunState";
import { validatePlayerAction } from "./validatePlayerAction";

describe("validatePlayerAction", () => {
	it.each([
		{ type: "PLAYER_BASIC_ATTACK" },
		{ type: "PLAYER_USE_SKILL", skillId: "shocking_grasp" },
		{ type: "PLAYER_USE_CONSUMABLE", consumableType: "explosivePotion" },
	] as const)("rejects $type against an invisible opponent", (action) => {
		const state = createTestCombatState();
		state.combat = createTestCombat();
		state.combat.player.skills = [{ skillId: "shocking_grasp", chargesRemaining: 2 }];
		state.hero.consumables.explosivePotion = 1;
		const original = structuredClone(state);
		expect(validatePlayerAction(state, action)).toEqual({ ok: true });
		state.combat.enemy.activeEffects.push(createTestStatus(state.combat.enemy, "invisible", 3));
		expect(validatePlayerAction(state, action)).toEqual({
			ok: false,
			error: "TARGET_NOT_AVAILABLE",
		});
		expect(state.hero).toEqual(original.hero);
		expect(state.rngState).toEqual(original.rngState);
	});
});
