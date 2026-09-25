import {
	SKILLS_BY_ID,
	type AttackDamageEffect,
	type AttackRider,
	type DamageType,
} from "@app/content";
import { describe, expect, it } from "vitest";
import type { CombatantSide, CombatState } from "../../../schemas";
import { createUnprotectedTestRunState } from "../../../test/createTestRunState";
import { resolveAttackDamageEffect } from "../skills/effects/resolveAttackDamageEffect";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { resolveBasicAttack } from "./resolveBasicAttack";
import { isEnemySkillUseful } from "../enemy/usefulness/isEnemySkillUseful";

const plainEffect: AttackDamageEffect = {
	type: "attackDamage",
	target: "enemy",
	multiplier: 1,
	attackRiders: [],
};

function damageRider(damageType: DamageType): AttackRider {
	return {
		timing: "onHit",
		effects: [
			{
				type: "damage",
				target: "enemy",
				damageType,
				damageClass: "magical",
				dice: "1d4",
				requiresAttackRoll: false,
			},
		],
	};
}

function createCombat(side: CombatantSide = "player", dualWielding = true) {
	const combat = structuredClone(createUnprotectedTestRunState().combat!);
	for (const actor of [combat.player, combat.enemy]) {
		actor.currentHp = actor.maxHp = 10000;
		actor.activeEffects = [];
		actor.featIds = [];
		actor.combatStats.damageModifiers = [];
		actor.combatStats.damageTakenModifiers = [];
		actor.combatStats.damageAffinities = {
			immunities: [],
			resistances: [],
			vulnerabilities: [],
		};
	}
	const actor = combat[side];
	actor.attributes.strength = 18;
	actor.combatStats.attackRollBonus = 100;
	actor.combatStats.criticalRangeBonus = 0;
	actor.basicAttack = {
		...actor.basicAttack,
		attackAttribute: "strength",
		attackRange: "melee",
		damage: { type: "piercing", damageClass: "physical", dice: "1d4", attribute: "strength" },
		attackRiders: [damageRider("radiant")],
	};
	actor.offHandBasicAttack = dualWielding
		? {
				...actor.basicAttack,
				damage: { ...actor.basicAttack.damage, type: "slashing" },
				attackRiders: [damageRider("cold")],
			}
		: null;
	actor.activeEffects = [
		{
			id: "forced-roll",
			type: "modifyRoll",
			sourceCombatantId: actor.id,
			sourceSide: side,
			source: {
				type: "skill",
				skillId: "focus_energy",
				sourceName: "Test",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns", remaining: 1 },
			remainingCharges: 10,
			roll: "attack",
			mode: "automaticSuccess",
		},
	];
	return combat;
}

function resolve(combat: CombatState, effect = plainEffect, actorSide: CombatantSide = "player") {
	return resolveAttackDamageEffect({
		combat,
		effect,
		actorSide,
		effectIndex: 0,
		skillId: "shadow_strike",
		skillName: "Shadow Strike",
		rngState: { value: 7 },
	});
}

describe("weapon skills and equipped hands", () => {
	it.each(["player", "enemy"] as const)(
		"applies Shadow Strike and each hand's riders for %s",
		(side) => {
			const combat = createCombat(side);
			const effect = SKILLS_BY_ID.shadow_strike.effects[0];
			if (effect.type !== "attackDamage") {
				throw new Error("Expected weapon attack");
			}
			const result = resolve(combat, effect, side);
			const damage = result.value.outcomes.filter((outcome) => outcome.type === "damage");
			expect(damage.map((outcome) => outcome.damageType)).toEqual([
				"piercing",
				"necrotic",
				"radiant",
				"slashing",
				"cold",
			]);
			expect(damage.every((outcome) => outcome.hpDamage > 0)).toBe(true);
			const target = side === "player" ? "enemy" : "player";
			expect(combat[target].currentHp - result.value.combat[target].currentHp).toBe(
				damage.reduce((sum, outcome) => sum + outcome.hpDamage, 0),
			);
			expect(resolve(combat, effect, side)).toEqual(result);
			expect(resolve(JSON.parse(JSON.stringify(combat)), effect, side)).toEqual(result);
		},
	);

	it("keeps skill enhancements and attribute damage on the primary hand", () => {
		const result = resolve(createCombat(), {
			...plainEffect,
			multiplier: 3,
			damageTypeOverride: "fire",
			damageClassOverride: "magical",
			attackRangeOverride: "ranged",
			extraDice: "1d4",
			extraDamageType: "lightning",
			extraDamageClass: "magical",
			attackRiders: [damageRider("necrotic")],
		});
		const damage = result.value.outcomes.filter((outcome) => outcome.type === "damage");
		expect(damage.map((outcome) => outcome.damageType)).toEqual([
			"fire",
			"lightning",
			"necrotic",
			"radiant",
			"slashing",
			"cold",
		]);
		expect(damage[0].hpDamage).toBeGreaterThanOrEqual(15);
		expect(damage[0].hpDamage).toBeLessThanOrEqual(24);
		expect(damage[4].hpDamage).toBeGreaterThanOrEqual(1);
		expect(damage[4].hpDamage).toBeLessThanOrEqual(4);
	});

	it("still applies weapon riders with no off hand", () => {
		const result = resolve(createCombat("player", false));
		expect(result.value.outcomes).toHaveLength(2);
		expect(result.value.outcomes[1]).toMatchObject({ type: "damage", damageType: "radiant" });
	});

	it("rolls the off hand after a primary miss and consumes a charge per roll", () => {
		const combat = createCombat();
		const forced = combat.player.activeEffects[0];
		if (forced.type !== "modifyRoll") {
			throw new Error("Expected roll modifier");
		}
		forced.mode = "automaticFailure";
		forced.remainingCharges = 1;
		const result = resolve(combat, { ...plainEffect, attackRiders: [damageRider("necrotic")] });
		expect(result.value.outcomes.map((outcome) => outcome.type)).toEqual([
			"miss",
			"damage",
			"damage",
		]);
		expect(result.value.outcomes[1]).toMatchObject({ damageType: "slashing" });
		expect(result.value.outcomes[2]).toMatchObject({ damageType: "cold" });
		expect(result.value.combat.player.activeEffects).toEqual([]);
	});

	it("does not trigger any riders when both hands miss", () => {
		const combat = createCombat();
		const forced = combat.player.activeEffects[0];
		if (forced.type !== "modifyRoll") {
			throw new Error("Expected roll modifier");
		}
		forced.mode = "automaticFailure";
		forced.remainingCharges = 2;
		const result = resolve(combat);
		expect(result.value.outcomes.map((outcome) => outcome.type)).toEqual(["miss", "miss"]);
		expect(result.value.combat.enemy.currentHp).toBe(combat.enemy.currentHp);
		expect(result.value.combat.player.activeEffects).toEqual([]);
	});

	it("checks on-crit riders separately for each hand", () => {
		const combat = createCombat();
		combat.player.basicAttack.attackRiders[0].timing = "onCrit";
		combat.player.offHandBasicAttack!.attackRiders[0].timing = "onCrit";
		expect(resolve(combat).value.outcomes).toHaveLength(2);
		const forced = combat.player.activeEffects[0];
		if (forced.type !== "modifyRoll") {
			throw new Error("Expected roll modifier");
		}
		forced.mode = "automaticCritical";
		forced.remainingCharges = 1;
		const result = resolve(combat);
		expect(result.value.outcomes).toHaveLength(3);
		expect(result.value.outcomes[0]).toMatchObject({ critical: true });
		expect(result.value.outcomes[1]).toMatchObject({ damageType: "radiant" });
		expect(result.value.outcomes[2]).toMatchObject({ damageType: "slashing", critical: false });
	});

	it("skips the off hand when the primary attack kills the target", () => {
		const combat = createCombat();
		combat.enemy.currentHp = 1;
		const result = resolve(combat);
		expect(result.value.outcomes).toHaveLength(2);
		expect(result.value.combat.player.activeEffects[0]).toMatchObject({ remainingCharges: 9 });
	});

	it("repeats both hands per effect and records radiant and necrotic in the skill log", () => {
		const combat = createCombat();
		const effect = { ...plainEffect, attackRiders: [damageRider("necrotic")] };
		const result = resolveSkillEffects({
			combat,
			actorSide: "player",
			effects: [effect, effect],
			skillId: "double_strike",
			skillName: "Double Strike",
			rngState: { value: 7 },
		});
		const added = result.value.log.slice(combat.log.length);
		expect(added.filter((entry) => entry.eventType === "damage_dealt")).toHaveLength(10);
		expect(added.filter((entry) => entry.message.includes("radiant"))).toHaveLength(2);
		expect(added.filter((entry) => entry.message.includes("necrotic"))).toHaveLength(2);
		expect(result.value.player.activeEffects[0]).toMatchObject({ remainingCharges: 6 });
	});

	it("refreshes the same weapon effect across basic attacks and skills", () => {
		const combat = createCombat("player", false);
		combat.player.basicAttack.attackRiders = [
			{
				timing: "onHit",
				effects: [
					{
						type: "modifyStat",
						target: "enemy",
						stat: "armourClass",
						value: -2,
						duration: { unit: "turns", value: 2 },
					},
				],
			},
		];
		const basic = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: { value: 7 },
		});
		const skill = resolve(basic.value);
		expect(skill.value.combat.enemy.activeEffects).toHaveLength(1);
		expect(skill.value.combat.enemy.activeEffects[0].source).toEqual(
			basic.value.enemy.activeEffects[0].source,
		);
	});

	it("recognises an already-active weapon rider when evaluating a skill", () => {
		const combat = createCombat("enemy", false);
		combat.player.combatStats.damageAffinities.immunities = ["piercing"];
		combat.enemy.basicAttack.attackRiders = [
			{
				timing: "onHit",
				effects: [
					{
						type: "modifyStat",
						target: "enemy",
						stat: "armourClass",
						value: -2,
						duration: { unit: "turns", value: 2 },
					},
				],
			},
		];
		expect(
			isEnemySkillUseful([plainEffect], combat.enemy, combat.player, "shadow_strike"),
		).toBe(true);
		const applied = resolveBasicAttack({
			combat,
			attackerSide: "enemy",
			rngState: { value: 7 },
		}).value;
		expect(
			isEnemySkillUseful([plainEffect], applied.enemy, applied.player, "shadow_strike"),
		).toBe(false);
	});

	it.each(["mainHand", "offHand"])(
		"recognises a skill whose only useful damage is a %s rider",
		(hand) => {
			const combat = createCombat("enemy");
			combat.player.combatStats.damageAffinities.immunities = [
				"piercing",
				"slashing",
				"fire",
				hand === "mainHand" ? "cold" : "radiant",
			];
			expect(
				isEnemySkillUseful(
					[{ ...plainEffect, damageTypeOverride: "fire" }],
					combat.enemy,
					combat.player,
					"shadow_strike",
				),
			).toBe(true);
			combat.player.combatStats.damageAffinities.immunities.push("radiant", "cold");
			expect(
				isEnemySkillUseful(
					[{ ...plainEffect, damageTypeOverride: "fire" }],
					combat.enemy,
					combat.player,
					"shadow_strike",
				),
			).toBe(false);
		},
	);

	it("recognises useful off-hand damage even if the enhanced primary attack is immune", () => {
		const combat = createCombat("enemy");
		combat.enemy.basicAttack.attackRiders = [];
		combat.enemy.offHandBasicAttack!.attackRiders = [];
		combat.player.combatStats.damageAffinities.immunities = ["fire"];
		expect(
			isEnemySkillUseful(
				[{ ...plainEffect, damageTypeOverride: "fire" }],
				combat.enemy,
				combat.player,
				"shadow_strike",
			),
		).toBe(true);
		combat.player.combatStats.damageAffinities.immunities.push("slashing");
		expect(
			isEnemySkillUseful(
				[{ ...plainEffect, damageTypeOverride: "fire" }],
				combat.enemy,
				combat.player,
				"shadow_strike",
			),
		).toBe(false);
	});
});
