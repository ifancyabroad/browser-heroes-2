import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../../../test/createTestCombat";
import { resolveDamageEffect } from "./resolveDamageEffect";

const explosiveEffect = {
	type: "damage",
	target: "enemy",
	dice: "3d6",
	damageType: "fire",
	damageClass: "other",
	requiresAttackRoll: false,
} as const;
describe("resolveDamageEffect", () => {
	it("rolls exactly 3d6 with no attack, save, attribute, critical, or level scaling", () => {
		const combat = createTestCombat();
		combat.player.level = 100;
		combat.player.attributes.strength = 30;
		combat.player.attributes.intelligence = 30;
		combat.player.combatStats.criticalRangeBonus = 20;
		combat.player.combatStats.criticalDiceMultiplierBonus = 10;
		combat.enemy.combatStats.armourClass = 1000;
		combat.enemy.combatStats.savingThrowBonus = 1000;
		const before = structuredClone(combat);

		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: explosiveEffect,
			rngState: { value: 0 },
		});

		// Seed 0 rolls 2, 5, 4; the next RNG state proves no extra checks were rolled.
		expect(result.rngState).toEqual({ value: 2245583870 });
		expect(result.value.combat.enemy.currentHp).toBe(89);
		expect(result.value.outcomes).toEqual([
			{
				type: "damage",
				targetId: combat.enemy.id,
				targetName: combat.enemy.name,
				damageType: "fire",
				hpDamage: 11,
				absorbedDamage: 0,
				affinity: "normal",
				critical: false,
				halfDamageSave: false,
			},
		]);
		expect(combat).toEqual(before);
	});

	it.each([
		["resistances", 5, "resistant"],
		["vulnerabilities", 22, "vulnerable"],
		["immunities", 0, "immune"],
	] as const)("applies fire %s", (field, amount, affinity) => {
		const combat = createTestCombat();
		combat.enemy.combatStats.damageAffinities[field] = ["fire"];
		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: explosiveEffect,
			rngState: { value: 0 },
		});
		expect(result.value.combat.enemy.currentHp).toBe(100 - amount);
		expect(result.value.outcomes[0]).toMatchObject({ hpDamage: amount, affinity });
	});

	it("matches fire/other and unfiltered modifiers, ignores range and other classes, and absorbs shields", () => {
		const combat = createTestCombat();
		combat.player.combatStats.damageModifiers = [
			{ operation: "add", value: 3, damageType: "fire", damageClass: "other" },
			{ operation: "add", value: 100, damageClass: "magical" },
			{ operation: "add", value: 100, damageClass: "physical" },
			{ operation: "add", value: 100, attackRange: "ranged" },
			{ operation: "add", value: 100, attackRange: "melee" },
		];
		combat.enemy.combatStats.damageTakenModifiers = [{ operation: "multiply", value: 2 }];
		combat.enemy.activeEffects.push({
			id: "shield",
			type: "shield",
			remainingAmount: 5,
			sourceCombatantId: combat.enemy.id,
			sourceSide: "enemy",
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Shield",
				sourceEffectKey: "shield",
			},
			duration: { unit: "turns", remaining: 2 },
		});
		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: explosiveEffect,
			rngState: { value: 0 },
		});
		expect(result.value.outcomes[0]).toMatchObject({ hpDamage: 23, absorbedDamage: 5 });
		expect(result.value.combat.enemy.activeEffects).toEqual([]);
		expect(result.value.combat.enemy.currentHp).toBe(77);
	});
});
