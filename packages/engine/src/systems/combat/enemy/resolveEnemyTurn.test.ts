import { describe, expect, it } from "vitest";
import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";
import { resolveEnemyTurn } from "./resolveEnemyTurn";

describe("resolveEnemyTurn", () => {
	it.each([{ type: "basicAttack" }, { type: "skill", skillId: "shocking_grasp" }] as const)(
		"skips a planned $type when the target becomes invisible without spending resources",
		(plannedAction) => {
			const combat = createTestCombat();
			combat.player.activeEffects.push(createTestStatus(combat.player, "invisible", 3));
			combat.enemy.activeEffects.push(createTestStatus(combat.enemy, "invisible", 3));
			combat.enemy.skills = [{ skillId: "shocking_grasp", chargesRemaining: 2 }];
			const original = structuredClone(combat);
			const result = resolveEnemyTurn({ combat, plannedAction, rngState: { value: 7 } });
			expect(result.value.player).toEqual(combat.player);
			expect(result.value.enemy).toEqual(combat.enemy);
			expect(result.rngState).toEqual({ value: 7 });
			expect(result.value.log).toEqual([
				expect.objectContaining({ eventType: "turn_skipped" }),
			]);
			expect(combat).toEqual(original);
		},
	);

	it("allows a self-targeted skill against an invisible opponent and reveals its actor", () => {
		const combat = createTestCombat();
		for (const side of ["player", "enemy"] as const) {
			combat[side].activeEffects.push(createTestStatus(combat[side], "invisible", 3));
		}
		combat.enemy.skills = [{ skillId: "armour", chargesRemaining: 2 }];
		const result = resolveEnemyTurn({
			combat,
			plannedAction: { type: "skill", skillId: "armour" },
			rngState: { value: 7 },
		});
		expect(hasActiveStatus(result.value.player, "invisible")).toBe(true);
		expect(hasActiveStatus(result.value.enemy, "invisible")).toBe(false);
		expect(result.value.enemy.skills[0].chargesRemaining).toBe(1);
		expect(result.value.log).toContainEqual(
			expect.objectContaining({ eventType: "skill_used", actor: "enemy" }),
		);
	});

	it("checks targetability after silence replaces a self-targeted skill with an attack", () => {
		const combat = createTestCombat();
		combat.player.activeEffects.push(createTestStatus(combat.player, "invisible", 3));
		combat.enemy.activeEffects.push(createTestStatus(combat.enemy, "silenced", 3));
		combat.enemy.skills = [{ skillId: "armour", chargesRemaining: 2 }];
		const result = resolveEnemyTurn({
			combat,
			plannedAction: { type: "skill", skillId: "armour" },
			rngState: { value: 7 },
		});
		expect(result.value.player).toEqual(combat.player);
		expect(result.value.enemy.skills).toEqual(combat.enemy.skills);
		expect(result.rngState).toEqual({ value: 7 });
		expect(result.value.log).toContainEqual(
			expect.objectContaining({ eventType: "turn_skipped" }),
		);
	});
});
