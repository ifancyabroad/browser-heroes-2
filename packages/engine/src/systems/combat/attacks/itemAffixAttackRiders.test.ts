import type { AttackRider } from "@app/content";
import { describe, expect, it } from "vitest";

import { createInitialRngState } from "../../../core/rng";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveBasicAttack } from "./resolveBasicAttack";

const MULTI_EFFECT_RIDER: AttackRider = {
	timing: "onCrit",
	effects: [
		{ type: "damage", target: "enemy", damageType: "lightning", dice: "1d4" },
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			duration: { unit: "turns", value: 2 },
		},
	],
};

describe("basic attack riders", () => {
	it("resolves every effect on a matching rider", () => {
		const combat = createGuaranteedCriticalCombat(MULTI_EFFECT_RIDER);
		const initialHp = combat.enemy.currentHp;

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("multi-effect-rider"),
		});

		expect(result.value.enemy.currentHp).toBeLessThan(initialHp);
		expect(result.value.enemy.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "modifyRoll",
				roll: "savingThrow",
				mode: "disadvantage",
			}),
		);
	});

	it("refreshes rather than stacks a repeated modifier from the same rider", () => {
		const firstResult = resolveBasicAttack({
			combat: createGuaranteedCriticalCombat(MULTI_EFFECT_RIDER),
			attackerSide: "player",
			rngState: createInitialRngState("multi-effect-rider"),
		});
		const secondResult = resolveBasicAttack({
			combat: firstResult.value,
			attackerSide: "player",
			rngState: createInitialRngState("multi-effect-rider"),
		});

		expect(
			secondResult.value.enemy.activeEffects.filter((effect) => effect.type === "modifyRoll"),
		).toHaveLength(1);
	});
});

function createGuaranteedCriticalCombat(rider: AttackRider) {
	const combat = structuredClone(createTestRunState().combat);

	if (!combat) {
		throw new Error("Expected test run to have combat");
	}

	combat.player.basicAttack.attackRiders = [rider];
	combat.player.combatStats.attackRollBonus = 100;
	combat.player.combatStats.criticalRangeBonus = 19;
	combat.enemy.combatStats.armourClass = 0;
	combat.enemy.maxHp = 10_000;
	combat.enemy.currentHp = 10_000;

	return combat;
}
