import { FEATS_BY_ID, type AttackRider, type FeatId } from "@app/content";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createInitialRngState } from "../../../core/rng";
import { runStateSchema } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveAttackDamageEffect } from "../skills/effects/resolveAttackDamageEffect";
import { resolveDamageEffect } from "../skills/effects/resolveDamageEffect";
import { collectFeatAttackRiders } from "./collectFeatAttackRiders";
import { resolveBasicAttack } from "./resolveBasicAttack";

const TEST_RIDER: AttackRider = {
	timing: "onHit",
	effects: [{ type: "shield", target: "self", amount: 3, duration: { unit: "turns", value: 2 } }],
};

const berserker = FEATS_BY_ID.berserker;
const originalAttackRiders = berserker.attackRiders;

describe("feat attack riders", () => {
	beforeEach(() => {
		berserker.attackRiders = [TEST_RIDER];
	});

	afterEach(() => {
		berserker.attackRiders = originalAttackRiders;
	});

	it("collects riders with their feat source identity", () => {
		expect(collectFeatAttackRiders(["berserker"])).toEqual([
			{
				featId: "berserker",
				featName: "Berserker",
				riderIndex: 0,
				rider: TEST_RIDER,
			},
		]);
	});

	it("resolves a feat rider after a successful basic attack", () => {
		const combat = createCombatWithBerserker();

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(result.value.player.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "shield",
				remainingAmount: 3,
				source: {
					type: "feat",
					featId: "berserker",
					sourceName: "Berserker",
					sourceEffectKey: "feat:berserker:rider:0:effect:0",
				},
			}),
		);
	});

	it("does not resolve an on-hit feat rider when the attack misses", () => {
		const combat = createCombatWithBerserker();

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("feat-basic-attack"),
		});

		expect(result.value.player.activeEffects).toEqual([]);
	});

	it("resolves an on-crit feat rider only after a critical hit", () => {
		berserker.attackRiders = [{ ...TEST_RIDER, timing: "onCrit" }];
		const combat = createCombatWithBerserker();

		const criticalResult = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("crit-42"),
		});
		const ordinaryHitResult = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(criticalResult.value.player.activeEffects).toHaveLength(1);
		expect(ordinaryHitResult.value.player.activeEffects).toEqual([]);
	});

	it("resolves a feat rider after a successful attack-damage skill effect", () => {
		const combat = createCombatWithBerserker();

		const result = resolveAttackDamageEffect({
			combat,
			actorSide: "player",
			effect: {
				type: "attackDamage",
				target: "enemy",
				multiplier: 1,
				attackRiders: [],
			},
			effectIndex: 0,
			skillId: "leap_attack",
			skillName: "Leap Attack",
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(result.value.combat.player.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "shield",
				remainingAmount: 3,
				source: expect.objectContaining({ type: "feat", featId: "berserker" }),
			}),
		);
	});

	it("resolves a feat rider after a successful attack-roll damage skill effect", () => {
		const combat = createCombatWithBerserker();

		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: {
				type: "damage",
				target: "enemy",
				damageType: "lightning",
				dice: "1d10",
				attribute: "intelligence",
				requiresAttackRoll: true,
			},
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(result.value.combat.player.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "shield",
				remainingAmount: 3,
				source: expect.objectContaining({ type: "feat", featId: "berserker" }),
			}),
		);
	});

	it("does not resolve a feat rider after damage without an attack roll", () => {
		const combat = createCombatWithBerserker();

		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: {
				type: "damage",
				target: "enemy",
				damageType: "lightning",
				dice: "1d10",
			},
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(result.value.combat.player.activeEffects).toEqual([]);
	});

	it("does not resolve a feat rider when an attack-roll damage skill misses", () => {
		const combat = createCombatWithBerserker();
		combat.player.combatStats.attackRollBonus = -100;

		const result = resolveDamageEffect({
			combat,
			actorSide: "player",
			effect: {
				type: "damage",
				target: "enemy",
				damageType: "lightning",
				dice: "1d10",
				attribute: "intelligence",
				requiresAttackRoll: true,
			},
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(result.value.combat.player.activeEffects).toEqual([]);
	});

	it("serializes active effects sourced from feats", () => {
		const state = createTestRunState();
		const combat = createCombatWithBerserker();
		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("feat-serialization"),
		});

		expect(
			runStateSchema.parse({
				...state,
				combat: result.value,
			}),
		).toBeDefined();
	});

	it("refreshes repeated active effects from the same feat rider", () => {
		const firstResult = resolveBasicAttack({
			combat: createCombatWithBerserker(),
			attackerSide: "player",
			rngState: createInitialRngState("feat-skill-attack"),
		});
		const secondResult = resolveBasicAttack({
			combat: firstResult.value,
			attackerSide: "player",
			rngState: createInitialRngState("feat-skill-attack"),
		});

		expect(secondResult.value.player.activeEffects).toHaveLength(1);
		expect(secondResult.value.player.activeEffects[0]).toMatchObject({
			type: "shield",
			remainingAmount: 3,
			source: { type: "feat", featId: "berserker" },
		});
	});
});

function createCombatWithBerserker() {
	return createCombatWithFeat("berserker");
}

function createCombatWithFeat(featId: FeatId) {
	const combat = structuredClone(createTestRunState().combat);

	if (!combat) {
		throw new Error("Expected test run to have combat");
	}

	combat.player.featIds.push(featId);
	combat.player.combatStats.attackRollBonus = 100;
	combat.enemy.combatStats.armourClass = 0;
	combat.enemy.maxHp = 10_000;
	combat.enemy.currentHp = 10_000;

	return combat;
}
