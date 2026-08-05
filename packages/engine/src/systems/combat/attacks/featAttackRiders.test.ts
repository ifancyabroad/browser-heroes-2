import { FEATS_BY_ID, type AttackRider } from "@app/content";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createInitialRngState } from "../../../core/rng";
import { runStateSchema } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveAttackDamageEffect } from "../skills/effects/resolveAttackDamageEffect";
import { collectFeatAttackRiders } from "./collectFeatAttackRiders";
import { resolveBasicAttack } from "./resolveBasicAttack";

const TEST_RIDER: AttackRider = {
	timing: "onHit",
	effects: [{ type: "shield", target: "self", amount: 3, duration: { unit: "turns", value: 2 } }],
};

const guardedAssault = FEATS_BY_ID.guarded_assault;
const originalAttackRiders = guardedAssault.attackRiders;

describe("feat attack riders", () => {
	beforeEach(() => {
		guardedAssault.attackRiders = [TEST_RIDER];
	});

	afterEach(() => {
		guardedAssault.attackRiders = originalAttackRiders;
	});

	it("collects riders with their feat source identity", () => {
		expect(collectFeatAttackRiders(["guarded_assault"])).toEqual([
			{
				featId: "guarded_assault",
				featName: "Guarded Assault",
				riderIndex: 0,
				rider: TEST_RIDER,
			},
		]);
	});

	it("resolves a feat rider after a successful basic attack", () => {
		const combat = createCombatWithGuardedAssault();

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
					featId: "guarded_assault",
					sourceName: "Guarded Assault",
					sourceEffectKey: "feat:guarded_assault:rider:0:effect:0",
				},
			}),
		);
	});

	it("does not resolve an on-hit feat rider when the attack misses", () => {
		const combat = createCombatWithGuardedAssault();

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: createInitialRngState("feat-basic-attack"),
		});

		expect(result.value.player.activeEffects).toEqual([]);
	});

	it("resolves an on-crit feat rider only after a critical hit", () => {
		guardedAssault.attackRiders = [{ ...TEST_RIDER, timing: "onCrit" }];
		const combat = createCombatWithGuardedAssault();

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
		const combat = createCombatWithGuardedAssault();

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
				source: expect.objectContaining({ type: "feat", featId: "guarded_assault" }),
			}),
		);
	});

	it("serializes active effects sourced from feats", () => {
		const state = createTestRunState();
		const combat = createCombatWithGuardedAssault();
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
			combat: createCombatWithGuardedAssault(),
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
			source: { type: "feat", featId: "guarded_assault" },
		});
	});
});

function createCombatWithGuardedAssault() {
	const combat = structuredClone(createTestRunState().combat);

	if (!combat) {
		throw new Error("Expected test run to have combat");
	}

	combat.player.featIds.push("guarded_assault");
	combat.player.combatStats.attackRollBonus = 100;
	combat.enemy.combatStats.armourClass = 0;
	combat.enemy.maxHp = 10_000;
	combat.enemy.currentHp = 10_000;

	return combat;
}
