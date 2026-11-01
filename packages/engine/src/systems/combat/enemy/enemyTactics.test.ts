import { describe, expect, it } from "vitest";

import type { EnemyActionCandidate } from "./enemyActions";
import { getEnemyActionWeight, normalizeEnemyTactic } from "./enemyTactics";

const basicAttack: EnemyActionCandidate = {
	action: { type: "basicAttack" },
	category: "basicAttack",
};

describe("enemy behaviour weights", () => {
	it.each([
		["standard", 6],
		["setup", 48],
		["recovery", 72],
	] as const)("shares the %s skill weight across default and caster", (category, expected) => {
		const candidate: EnemyActionCandidate = {
			action: { type: "skill", skillId: "shocking_grasp" },
			category,
		};
		expect(getEnemyActionWeight("default", candidate)).toBe(expected);
		expect(getEnemyActionWeight("caster", candidate)).toBe(expected);
		expect(getEnemyActionWeight("random", candidate)).toBe(1);
	});

	it("only deprioritizes basic attacks for caster", () => {
		expect(getEnemyActionWeight("default", basicAttack)).toBe(6);
		expect(getEnemyActionWeight("caster", basicAttack)).toBe(1);
		expect(getEnemyActionWeight("random", basicAttack)).toBe(1);
	});

	it.each([
		["aggressive", "default"],
		["defensive", "default"],
		["default", "default"],
		["caster", "caster"],
		["random", "random"],
	] as const)("normalizes %s to %s", (tactic, expected) => {
		expect(normalizeEnemyTactic(tactic)).toBe(expected);
	});
});
