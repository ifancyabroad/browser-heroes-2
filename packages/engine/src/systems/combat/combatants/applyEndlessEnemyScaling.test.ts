import { describe, expect, it } from "vitest";
import type { CombatantState } from "../../../schemas";
import { applyEndlessEnemyScaling } from "./applyEndlessEnemyScaling";

function createEnemy(): CombatantState {
	return {
		combatStats: {
			damageModifiers: [{ operation: "add", value: 2 }],
			damageTakenModifiers: [{ operation: "multiply", value: 0.9 }],
		},
	} as CombatantState;
}

describe("applyEndlessEnemyScaling", () => {
	it("does not scale enemies before the first endless cycle", () => {
		const enemy = createEnemy();

		expect(applyEndlessEnemyScaling(enemy, 0)).toBe(enemy);
	});

	it("adds half of base damage for each endless cycle", () => {
		const scaledEnemy = applyEndlessEnemyScaling(createEnemy(), 2);

		expect(scaledEnemy.combatStats.damageModifiers).toEqual([
			{ operation: "add", value: 2 },
			{ operation: "multiply", value: 2 },
		]);
	});

	it.each([
		[1, 0.5],
		[2, 0.25],
		[3, 0.125],
	])("halves damage taken in endless cycle %i", (endlessCycle, multiplier) => {
		const scaledEnemy = applyEndlessEnemyScaling(createEnemy(), endlessCycle);

		expect(scaledEnemy.combatStats.damageTakenModifiers).toEqual([
			{ operation: "multiply", value: 0.9 },
			{ operation: "multiply", value: multiplier },
		]);
	});
});
