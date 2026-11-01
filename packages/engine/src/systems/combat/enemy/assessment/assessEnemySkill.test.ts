import type { Effect } from "@app/content";
import { describe, expect, it } from "vitest";

import type { CombatState } from "../../../../schemas";
import { createTestCombat } from "../../../../test/createTestCombat";
import { assessEnemySkill } from "./assessEnemySkill";

// The ID is only an effect-source handle. These tests never look up its definition.
const skillId = "shocking_grasp";
const duration = { unit: "turns", value: 2 } as const;
const damage: Effect = {
	type: "damage",
	target: "enemy",
	damageType: "lightning",
	damageClass: "magical",
	dice: "1d4",
	requiresAttackRoll: false,
};
const heal: Effect = { type: "heal", target: "self", dice: "1d4" };
const regeneration: Effect = { type: "healOverTime", target: "self", dice: "1d4", duration };
const protection: Effect = {
	type: "modifyDamageTaken",
	target: "self",
	operation: "multiply",
	value: 0.5,
	duration,
};
const debuff: Effect = {
	type: "modifyStat",
	target: "enemy",
	stat: "armourClass",
	value: -2,
	duration,
};
const activeEffect = {
	id: "test-effect",
	sourceCombatantId: "test-combat:enemy",
	sourceSide: "enemy",
	source: { type: "skill", skillId, sourceName: "Test skill", sourceEffectKey: "effect:0" },
	duration: { unit: "turns", remaining: 2 },
} as const;

function assess(combat: CombatState, effects: Effect[]) {
	return assessEnemySkill(effects, combat.enemy, combat.player, skillId);
}

describe("enemy skill assessment", () => {
	it.each([100, 50, 1])(
		"recognizes protection, damage, and eligible recovery at %i HP",
		(currentHp) => {
			const combat = createTestCombat();
			combat.enemy.currentHp = currentHp;
			expect(assess(combat, [protection])).toBe("setup");
			expect(assess(combat, [damage])).toBe("standard");
			expect(assess(combat, [regeneration])).toBe(currentHp <= 50 ? "recovery" : null);
		},
	);

	it("ignores an active protection even when the skill also has a harmful self-effect", () => {
		const combat = createTestCombat();
		combat.enemy.activeEffects = [
			{ ...activeEffect, type: "modifyDamageTaken", operation: "multiply", value: 0.5 },
		];
		const drawback: Effect = {
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "disadvantage",
			attribute: "dexterity",
			duration,
		};
		expect(assess(combat, [protection, drawback])).toBeNull();
		combat.enemy.activeEffects = [];
		expect(assess(combat, [protection, drawback])).toBe("setup");
	});

	it("drops mixed damage and debuff to standard while the debuff is active", () => {
		const combat = createTestCombat();
		combat.player.activeEffects = [
			{
				...activeEffect,
				type: "modifyStat",
				stat: "armourClass",
				value: -2,
				source: { ...activeEffect.source, sourceEffectKey: "effect:1" },
			},
		];
		expect(assess(combat, [damage, debuff])).toBe("standard");
		combat.player.activeEffects = [];
		expect(assess(combat, [damage, debuff])).toBe("setup");
	});

	it("excludes pure damage against immunity but keeps an independent useful debuff", () => {
		const combat = createTestCombat();
		combat.player.combatStats.damageAffinities.immunities = ["lightning"];
		expect(assess(combat, [damage])).toBeNull();
		expect(assess(combat, [damage, debuff])).toBe("setup");
	});

	it("does not treat vulnerability as useful when immunity still prevents damage", () => {
		const combat = createTestCombat();
		combat.player.combatStats.damageAffinities.immunities = ["lightning"];
		const vulnerability: Effect = {
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "lightning",
			duration,
		};
		expect(assess(combat, [damage, vulnerability])).toBeNull();
	});

	it("requires recovery to be useful before it overrides other effects", () => {
		const combat = createTestCombat();
		expect(assess(combat, [damage, heal])).toBe("standard");
		expect(assess(combat, [heal, protection])).toBeNull();
		combat.enemy.currentHp = 25;
		expect(assess(combat, [damage, heal])).toBe("recovery");
		expect(assess(combat, [heal, protection])).toBe("recovery");
	});

	it("avoids wasting most of an amplified direct heal", () => {
		const combat = createTestCombat();
		combat.enemy.currentHp = 50;
		expect(assess(combat, [heal])).toBe("recovery");
		combat.enemy.combatStats.healingMultiplier = 100;
		expect(assess(combat, [heal])).toBeNull();
	});

	it("does not reapply active regeneration and allows it again after expiry", () => {
		const combat = createTestCombat();
		combat.enemy.currentHp = 50;
		combat.enemy.activeEffects = [{ ...activeEffect, type: "healOverTime", dice: "1d4" }];
		expect(assess(combat, [regeneration])).toBeNull();
		combat.enemy.activeEffects = [];
		expect(assess(combat, [regeneration])).toBe("recovery");
	});

	it("recognizes a weapon skill's debuff rider only while it is useful", () => {
		const combat = createTestCombat();
		const weaponSkill: Effect = {
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [{ timing: "onHit", effects: [debuff] }],
		};
		expect(assess(combat, [weaponSkill])).toBe("setup");
		combat.player.activeEffects = [
			{
				...activeEffect,
				type: "modifyStat",
				stat: "armourClass",
				value: -2,
				source: { ...activeEffect.source, sourceEffectKey: "effect:0:rider:0:effect:0" },
			},
		];
		expect(assess(combat, [weaponSkill])).toBe("standard");
	});

	it("does not reapply active damage over time", () => {
		const combat = createTestCombat();
		const recurringDamage: Effect = {
			type: "damageOverTime",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "1d4",
			duration,
		};
		expect(assess(combat, [recurringDamage])).toBe("setup");
		combat.player.activeEffects = [
			{
				...activeEffect,
				type: "damageOverTime",
				damageType: "lightning",
				damageClass: "magical",
				dice: "1d4",
			},
		];
		expect(assess(combat, [recurringDamage])).toBeNull();
	});
});
