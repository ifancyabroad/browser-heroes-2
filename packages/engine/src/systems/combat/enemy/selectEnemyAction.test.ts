import { describe, expect, it } from "vitest";

import type { ActiveCombatEffect, CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";

import { getUsefulEnemySkillIds } from "./getUsefulEnemySkillIds";
import { selectEnemyAction } from "./selectEnemyAction";

describe("enemy skill usefulness", () => {
	it("excludes healing above half health and preserves the rng state when no skill is useful", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]);
		const rngState = { value: 123 };
		const healthyHealer = { ...healer, currentHp: Math.floor(healer.maxHp / 2) + 1 };

		expect(getUsefulEnemySkillIds(healthyHealer, player)).toEqual([]);
		expect(
			selectEnemyAction({ enemy: healthyHealer, player, tactic: "caster", rngState }),
		).toEqual({
			value: { type: "basicAttack" },
			rngState,
		});
	});

	it("allows direct healing below half health when enough of its expected value is useful", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]);

		expect(getUsefulEnemySkillIds({ ...healer, currentHp: 1 }, player)).toEqual([
			"cure_minor_wounds",
		]);
	});

	it("still avoids wasting most of an amplified direct heal below half health", () => {
		const { enemy, player } = createCombatants();
		const healer = {
			...withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]),
			currentHp: Math.floor(enemy.maxHp / 2),
			activeEffects: [
				...enemy.activeEffects,
				{
					id: "amplified-healing",
					type: "modifyHealing" as const,
					sourceCombatantId: player.id,
					sourceSide: "player" as const,
					source: {
						type: "skill" as const,
						skillId: "curse" as const,
						sourceName: "Amplified Healing",
						sourceEffectKey: "test",
					},
					duration: { unit: "turns", remaining: 2 },
					multiplier: 10,
				},
			],
		};

		expect(getUsefulEnemySkillIds(healer, player)).toEqual([]);
	});

	it("uses healing over time only at or below half health and while it is inactive", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "regeneration", chargesRemaining: 2 }]);
		const healthy = { ...healer, currentHp: Math.floor(healer.maxHp / 2) + 1 };
		const wounded = { ...healer, currentHp: Math.floor(healer.maxHp / 2) };
		const regenerating = {
			...wounded,
			activeEffects: [
				...wounded.activeEffects,
				{
					id: "active-regeneration",
					type: "healOverTime" as const,
					sourceCombatantId: wounded.id,
					sourceSide: "enemy" as const,
					source: {
						type: "skill" as const,
						skillId: "regeneration" as const,
						sourceName: "Regeneration",
						sourceEffectKey: "effect:0",
					},
					duration: { unit: "turns" as const, remaining: 2 },
					dice: "1d8" as const,
				},
			],
		};

		expect(getUsefulEnemySkillIds(healthy, player)).toEqual([]);
		expect(getUsefulEnemySkillIds(wounded, player)).toEqual(["regeneration"]);
		expect(getUsefulEnemySkillIds(regenerating, player)).toEqual([]);
	});

	it("keeps a mixed damage and healing skill useful at full health", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "drain_life", chargesRemaining: 2 }]);

		expect(getUsefulEnemySkillIds(healer, player)).toEqual(["drain_life"]);
		expect(getUsefulEnemySkillIds(healer, withImmunity(player, "necrotic"))).toEqual([]);
	});

	it("does not let defensive effects bypass the recovery threshold", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [
			{ skillId: "last_stand", chargesRemaining: 1 },
			{ skillId: "reconstruct", chargesRemaining: 1 },
		]);

		expect(getUsefulEnemySkillIds(healer, player)).toEqual([]);
	});

	it("excludes a pure temporary effect while that exact effect is active", () => {
		const { enemy, player } = createCombatants();
		const effect: ActiveCombatEffect = {
			id: "shield-wall-effect",
			type: "modifyStat",
			sourceCombatantId: "previous-enemy",
			sourceSide: "enemy",
			source: {
				type: "skill",
				skillId: "shield_wall",
				sourceName: "Shield Wall",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns", remaining: 3 },
			stat: "armourClass",
			value: 3,
		};
		const defender = {
			...withSkills(enemy, [{ skillId: "shield_wall", chargesRemaining: 5 }]),
			activeEffects: [effect],
		};

		expect(getUsefulEnemySkillIds(defender, player)).toEqual([]);
	});

	it("excludes pure damage when the target is immune", () => {
		const { enemy, player } = createCombatants();
		const caster = withSkills(enemy, [{ skillId: "shocking_grasp", chargesRemaining: 12 }]);
		const immunePlayer = {
			...player,
			combatStats: {
				...player.combatStats,
				damageAffinities: {
					...player.combatStats.damageAffinities,
					immunities: [
						...player.combatStats.damageAffinities.immunities,
						"lightning" as const,
					],
				},
			},
		};

		expect(getUsefulEnemySkillIds(caster, immunePlayer)).toEqual([]);
	});

	it("keeps an attack useful when a non-immune rider can still resolve", () => {
		const { enemy, player } = createCombatants();
		const attacker = withSkills(enemy, [{ skillId: "acid_strike", chargesRemaining: 7 }]);
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);

		expect(getUsefulEnemySkillIds(attacker, immunePlayer)).toEqual(["acid_strike"]);
	});

	it("excludes affinity changes that do not improve an immune-damage skill", () => {
		const { enemy, player } = createCombatants();
		const caster = withSkills(enemy, [{ skillId: "fireball", chargesRemaining: 4 }]);
		const immunePlayer = withImmunity(player, "fire");

		expect(getUsefulEnemySkillIds(caster, immunePlayer)).toEqual([]);
	});

	it("makes caster tactics favor useful skills more strongly than the default tactic", () => {
		const { enemy, player } = createCombatants();
		const caster = withSkills(enemy, [{ skillId: "shocking_grasp", chargesRemaining: 12 }]);
		let casterSkillSelections = 0;
		let defaultSkillSelections = 0;

		for (let value = 0; value < 100; value += 1) {
			if (
				selectEnemyAction({ enemy: caster, player, tactic: "caster", rngState: { value } })
					.value.type === "skill"
			) {
				casterSkillSelections += 1;
			}
			if (
				selectEnemyAction({ enemy: caster, player, tactic: "default", rngState: { value } })
					.value.type === "skill"
			) {
				defaultSkillSelections += 1;
			}
		}

		expect(casterSkillSelections).toBeGreaterThan(defaultSkillSelections);
	});
});

describe("conceder tactic", () => {
	it("repeatedly concedes at or below half health while charges remain", () => {
		const { enemy, player } = createCombatants();
		const conceder = {
			...withSkills(enemy, [{ skillId: "thou_hast_bested_me", chargesRemaining: 5 }]),
			currentHp: Math.floor(enemy.maxHp / 2),
		};
		const rngState = { value: 456 };

		expect(
			selectEnemyAction({ enemy: conceder, player, tactic: "conceder", rngState }),
		).toEqual({
			value: { type: "skill", skillId: "thou_hast_bested_me" },
			rngState,
		});
		expect(
			selectEnemyAction({
				enemy: {
					...conceder,
					skills: [{ skillId: "thou_hast_bested_me", chargesRemaining: 4 }],
				},
				player,
				tactic: "conceder",
				rngState,
			}),
		).toEqual({ value: { type: "skill", skillId: "thou_hast_bested_me" }, rngState });
	});

	it("does not concede above half health or without a charge", () => {
		const { enemy, player } = createCombatants();
		const conceder = withSkills(enemy, [
			{ skillId: "thou_hast_bested_me", chargesRemaining: 5 },
		]);
		const rngState = { value: 789 };

		expect(
			selectEnemyAction({ enemy: conceder, player, tactic: "conceder", rngState }).value,
		).toEqual({ type: "basicAttack" });
		expect(
			selectEnemyAction({
				enemy: {
					...conceder,
					currentHp: Math.floor(enemy.maxHp / 2),
					skills: [{ skillId: "thou_hast_bested_me", chargesRemaining: 0 }],
				},
				player,
				tactic: "conceder",
				rngState,
			}).value,
		).toEqual({ type: "basicAttack" });
	});
});

function createCombatants(): { enemy: CombatantState; player: CombatantState } {
	const combat = createTestRunState().combat;

	if (!combat) {
		throw new Error("Expected test combat");
	}

	return { enemy: combat.enemy, player: combat.player };
}

function withSkills(enemy: CombatantState, skills: CombatantState["skills"]): CombatantState {
	return { ...enemy, skills };
}

function withImmunity(
	combatant: CombatantState,
	damageType: CombatantState["basicAttack"]["damage"]["type"],
): CombatantState {
	return {
		...combatant,
		combatStats: {
			...combatant.combatStats,
			damageAffinities: {
				...combatant.combatStats.damageAffinities,
				immunities: [...combatant.combatStats.damageAffinities.immunities, damageType],
			},
		},
	};
}
