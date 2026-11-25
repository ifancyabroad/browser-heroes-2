import { describe, expect, it } from "vitest";
import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { createTestCombatState } from "../../../test/createTestRunState";
import { resolvePlayerTurn } from "./resolvePlayerTurn";

describe("resolvePlayerTurn", () => {
	function invisibleState() {
		const combat = createTestCombat();
		for (const side of ["player", "enemy"] as const) {
			combat[side].activeEffects.push(createTestStatus(combat[side], "invisible", 3));
		}
		combat.player.skills = [
			{ skillId: "shocking_grasp", chargesRemaining: 2 },
			{ skillId: "armour", chargesRemaining: 2 },
		];
		const state = { ...createTestCombatState(), combat, rngState: { value: 7 } };
		state.hero.consumables.explosivePotion = 1;
		return state;
	}

	it.each([
		{ type: "PLAYER_BASIC_ATTACK" },
		{ type: "PLAYER_USE_SKILL", skillId: "shocking_grasp" },
		{ type: "PLAYER_USE_CONSUMABLE", consumableType: "explosivePotion" },
	] as const)("skips $type when its target becomes invisible before execution", (action) => {
		const state = invisibleState();
		const result = resolvePlayerTurn(state, action);
		expect(result.state.hero).toEqual(state.hero);
		expect(result.state.combat.player).toEqual(state.combat.player);
		expect(result.state.combat.enemy).toEqual(state.combat.enemy);
		expect(result.state.rngState).toEqual(state.rngState);
		expect(result.events).toEqual([]);
		expect(result.state.combat.log).toEqual([
			expect.objectContaining({ eventType: "turn_skipped" }),
		]);
	});

	it("checks targetability when silence replaces a self-targeted skill with an attack", () => {
		const state = invisibleState();
		state.combat.player.activeEffects.push(
			createTestStatus(state.combat.player, "silenced", 2),
		);
		const result = resolvePlayerTurn(state, { type: "PLAYER_USE_SKILL", skillId: "armour" });
		expect(result.state.combat.player).toEqual(state.combat.player);
		expect(result.state.combat.enemy).toEqual(state.combat.enemy);
		expect(result.state.rngState).toEqual(state.rngState);
		expect(result.events).toEqual([]);
	});

	it("does not consume a potion or reveal the actor when stun interrupts its use", () => {
		const state = invisibleState();
		state.combat.player.activeEffects.push(createTestStatus(state.combat.player, "stunned", 2));
		const result = resolvePlayerTurn(state, {
			type: "PLAYER_USE_CONSUMABLE",
			consumableType: "healingPotion",
		});
		expect(result.state.combat.player).toEqual(state.combat.player);
		expect(result.state.hero.consumables).toEqual(state.hero.consumables);
		expect(result.events).toEqual([]);
	});
});
