import { describe, expect, it } from "vitest";

import type { ActiveCombatEffect, CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";

import { getUsefulEnemySkillIds } from "./getUsefulEnemySkillIds";
import { selectEnemyAction } from "./selectEnemyAction";

describe("enemy skill usefulness", () => {
	it("excludes healing at full health and preserves the rng state when no skill is useful", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]);
		const rngState = { value: 123 };

		expect(getUsefulEnemySkillIds(healer, player)).toEqual([]);
		expect(selectEnemyAction({ enemy: healer, player, tactic: "caster", rngState })).toEqual({
			value: { type: "basicAttack" },
			rngState,
		});
	});

	it("uses a heal only when enough of its expected value will not be wasted", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]);

		expect(getUsefulEnemySkillIds({ ...healer, currentHp: healer.maxHp - 1 }, player)).toEqual(
			[],
		);
		expect(getUsefulEnemySkillIds({ ...healer, currentHp: healer.maxHp - 4 }, player)).toEqual([
			"cure_minor_wounds",
		]);
	});

	it("accounts for active healing modifiers when judging expected healing", () => {
		const { enemy, player } = createCombatants();
		const healer = {
			...withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]),
			currentHp: enemy.maxHp - 1,
			activeEffects: [
				...enemy.activeEffects,
				{
					id: "reduced-healing",
					type: "modifyHealing" as const,
					sourceCombatantId: player.id,
					sourceSide: "player" as const,
					source: {
						type: "skill" as const,
						skillId: "curse" as const,
						sourceName: "Reduced Healing",
						sourceEffectKey: "test",
					},
					duration: { unit: "turns", remaining: 2 },
					multiplier: 0.1,
				},
			],
		};

		expect(getUsefulEnemySkillIds(healer, player)).toEqual(["cure_minor_wounds"]);
	});

	it("keeps a mixed damage and healing skill useful at full health", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "drain_life", chargesRemaining: 2 }]);

		expect(getUsefulEnemySkillIds(healer, player)).toEqual(["drain_life"]);
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
