import { describe, expect, it } from "vitest";
import type { CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { applyDamageAffinity, getDamageAffinity } from "./damageAffinity";

describe("applyDamageAffinity", () => {
	it.each([
		["normal", 5, 5],
		["resistant", 5, 2],
		["immune", 5, 0],
		["vulnerable", 5, 10],
	] as const)("applies %s affinity", (affinity, amount, expected) => {
		expect(applyDamageAffinity(amount, affinity)).toBe(expected);
	});

	it("floors and clamps the base amount before applying affinity", () => {
		expect(applyDamageAffinity(5.9, "normal")).toBe(5);
		expect(applyDamageAffinity(-5, "vulnerable")).toBe(0);
	});
});

describe("getDamageAffinity", () => {
	it("reads the defender's configured affinity", () => {
		const defender: CombatantState = {
			...createTestRunState().combat!.enemy,
			combatStats: {
				...createTestRunState().combat!.enemy.combatStats,
				damageAffinities: {
					resistances: ["cold"],
					immunities: ["fire"],
					vulnerabilities: ["acid"],
				},
			},
		};

		expect(getDamageAffinity(defender, "cold")).toBe("resistant");
		expect(getDamageAffinity(defender, "fire")).toBe("immune");
		expect(getDamageAffinity(defender, "acid")).toBe("vulnerable");
		expect(getDamageAffinity(defender, "slashing")).toBe("normal");
	});

	it("cancels resistance and vulnerability for the same damage type", () => {
		const defender: CombatantState = {
			...createTestRunState().combat!.enemy,
			combatStats: {
				...createTestRunState().combat!.enemy.combatStats,
				damageAffinities: {
					resistances: ["cold"],
					immunities: [],
					vulnerabilities: ["cold"],
				},
			},
		};

		expect(getDamageAffinity(defender, "cold")).toBe("normal");
	});

	it("keeps immunity when all affinities apply to the same damage type", () => {
		const defender: CombatantState = {
			...createTestRunState().combat!.enemy,
			combatStats: {
				...createTestRunState().combat!.enemy.combatStats,
				damageAffinities: {
					resistances: ["fire"],
					immunities: ["fire"],
					vulnerabilities: ["fire"],
				},
			},
		};

		expect(getDamageAffinity(defender, "fire")).toBe("immune");
	});
});
