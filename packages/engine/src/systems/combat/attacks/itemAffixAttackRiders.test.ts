import { ITEMAFFIXES_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { createInitialRngState } from "../../../core/rng";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveBasicAttack } from "./resolveBasicAttack";

describe("item affix attack riders", () => {
	it("resolves both effects of an epic offensive rider", () => {
		const combat = createGuaranteedCriticalCombat("thunderous");
		const initialHp = combat.enemy.currentHp;

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("thunderous-affix"),
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

	it("refreshes rather than stacks a repeated affix modifier", () => {
		const firstResult = resolveBasicAttack({
			combat: createGuaranteedCriticalCombat("thunderous"),
			attackerSide: "player",
			rngState: createInitialRngState("thunderous-affix"),
		});
		const secondResult = resolveBasicAttack({
			combat: firstResult.value,
			attackerSide: "player",
			rngState: createInitialRngState("thunderous-affix"),
		});

		expect(
			secondResult.value.enemy.activeEffects.filter((effect) => effect.type === "modifyRoll"),
		).toHaveLength(1);
	});

	it("applies the offensive and defensive parts of a radiant rider", () => {
		const combat = createGuaranteedCriticalCombat("sun_blessed");
		const initialHp = combat.enemy.currentHp;

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("sun-blessed-affix"),
		});

		expect(result.value.enemy.currentHp).toBeLessThan(initialHp);
		expect(result.value.player.activeEffects).toContainEqual(
			expect.objectContaining({ type: "shield", remainingAmount: 8 }),
		);
	});

	it("makes Cinderbreaking useful without pre-existing fire resistance", () => {
		const combat = createGuaranteedCriticalCombat("cinderbreaking");
		const initialHp = combat.enemy.currentHp;

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("cinderbreaking-affix"),
		});

		expect(result.value.enemy.currentHp).toBeLessThan(initialHp);
		expect(result.value.enemy.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "modifyDamageAffinity",
				affinity: "vulnerability",
				operation: "add",
				damageType: "fire",
			}),
		);
	});
});

function createGuaranteedCriticalCombat(affixId: "cinderbreaking" | "thunderous" | "sun_blessed") {
	const combat = structuredClone(createTestRunState().combat);

	if (!combat) {
		throw new Error("Expected test run to have combat");
	}

	combat.player.basicAttack.attackRiders = ITEMAFFIXES_BY_ID[affixId].attackRiders;
	combat.player.combatStats.attackRollBonus = 100;
	combat.player.combatStats.criticalRangeBonus = 19;
	combat.enemy.combatStats.armourClass = 0;
	combat.enemy.maxHp = 10_000;
	combat.enemy.currentHp = 10_000;

	return combat;
}
