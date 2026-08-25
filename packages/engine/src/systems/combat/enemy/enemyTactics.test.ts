import { describe, expect, it } from "vitest";

import type { CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";

import { getEnemyActionWeight, type EnemyAction } from "./enemyTactics";

const BASIC_ATTACK: EnemyAction = { type: "basicAttack" };
const OFFENSIVE_SKILL: EnemyAction = { type: "skill", skillId: "shocking_grasp" };
const HEALING_SKILL: EnemyAction = { type: "skill", skillId: "regeneration" };
const DEFENSIVE_SKILL: EnemyAction = { type: "skill", skillId: "shield_wall" };

describe("enemy tactic weights", () => {
	it("gives every useful action equal weight for random tactics", () => {
		const enemy = createEnemy();

		expect(getEnemyActionWeight("random", enemy, BASIC_ATTACK)).toBe(1);
		expect(getEnemyActionWeight("random", enemy, OFFENSIVE_SKILL)).toBe(1);
		expect(getEnemyActionWeight("random", enemy, HEALING_SKILL)).toBe(1);
	});

	it("makes caster tactics strongly favor skills", () => {
		const enemy = createEnemy();

		expect(getEnemyActionWeight("caster", enemy, OFFENSIVE_SKILL)).toBe(6);
		expect(getEnemyActionWeight("caster", enemy, HEALING_SKILL)).toBe(6);
		expect(getEnemyActionWeight("caster", enemy, BASIC_ATTACK)).toBe(1);
	});

	it("makes aggressive tactics favor offensive skills", () => {
		const enemy = createEnemy();

		expect(getEnemyActionWeight("aggressive", enemy, OFFENSIVE_SKILL)).toBe(7);
		expect(getEnemyActionWeight("aggressive", enemy, BASIC_ATTACK)).toBe(3);
		expect(getEnemyActionWeight("aggressive", enemy, HEALING_SKILL)).toBe(1);
	});

	it("makes defensive tactics favor recovery and protection while wounded", () => {
		const enemy = createEnemy();
		const woundedEnemy = { ...enemy, currentHp: Math.floor(enemy.maxHp / 2) };

		expect(getEnemyActionWeight("defensive", woundedEnemy, HEALING_SKILL)).toBe(9);
		expect(getEnemyActionWeight("defensive", woundedEnemy, DEFENSIVE_SKILL)).toBe(6);
		expect(getEnemyActionWeight("defensive", woundedEnemy, OFFENSIVE_SKILL)).toBe(2);
		expect(getEnemyActionWeight("defensive", woundedEnemy, BASIC_ATTACK)).toBe(1);
	});

	it("keeps healthy defensive tactics combat-focused", () => {
		const enemy = createEnemy();

		expect(getEnemyActionWeight("defensive", enemy, OFFENSIVE_SKILL)).toBe(3);
		expect(getEnemyActionWeight("defensive", enemy, BASIC_ATTACK)).toBe(3);
		expect(getEnemyActionWeight("defensive", enemy, HEALING_SKILL)).toBe(1);
	});

	it("gives wounded default tactics a moderate recovery preference", () => {
		const enemy = createEnemy();
		const woundedEnemy = { ...enemy, currentHp: Math.floor(enemy.maxHp / 2) };

		expect(getEnemyActionWeight("default", woundedEnemy, HEALING_SKILL)).toBe(5);
		expect(getEnemyActionWeight("default", woundedEnemy, OFFENSIVE_SKILL)).toBe(3);
		expect(getEnemyActionWeight("default", woundedEnemy, DEFENSIVE_SKILL)).toBe(2);
	});
});

function createEnemy(): CombatantState {
	const combat = createTestRunState().combat;

	if (!combat) {
		throw new Error("Expected test combat");
	}

	return combat.enemy;
}
