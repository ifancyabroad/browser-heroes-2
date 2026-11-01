import { SKILLS_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import type { CombatantState } from "../../../../schemas";
import { createTestCombat } from "../../../../test/createTestCombat";

import { selectEnemyAction } from "./selectEnemyAction";

describe("enemy action selection", () => {
	it.each(["aggressive", "defensive"] as const)("treats legacy %s as default", (tactic) => {
		const { enemy, player } = createCombatants();
		enemy.skills = [
			{ skillId: "stand_ground", chargesRemaining: 3 },
			{ skillId: "shocking_grasp", chargesRemaining: 12 },
			{ skillId: "regeneration", chargesRemaining: 2 },
		];
		for (const currentHp of [enemy.maxHp, 1]) {
			const actor = { ...enemy, currentHp };
			for (let value = 0; value < 100; value += 1) {
				const input = { enemy: actor, player, rngState: { value } };
				expect(selectEnemyAction({ ...input, tactic })).toEqual(
					selectEnemyAction({ ...input, tactic: "default" }),
				);
			}
		}
	});

	it("excludes healing above half health and preserves the rng state when no skill is useful", () => {
		const { enemy, player } = createCombatants();
		const healer = withSkills(enemy, [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }]);
		const rngState = { value: 123 };
		const healthyHealer = { ...healer, currentHp: Math.floor(healer.maxHp / 2) + 1 };

		expect(
			selectEnemyAction({ enemy: healthyHealer, player, tactic: "caster", rngState }),
		).toEqual({
			value: { type: "basicAttack" },
			rngState,
		});
	});

	it("excludes an immune basic attack when a useful skill is available", () => {
		const { enemy, player } = createCombatants();
		const attacker = withSkills(enemy, [{ skillId: "shocking_grasp", chargesRemaining: 12 }]);
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);

		for (let value = 0; value < 20; value += 1) {
			expect(
				selectEnemyAction({
					enemy: attacker,
					player: immunePlayer,
					tactic: "random",
					rngState: { value },
				}).value,
			).toEqual({ type: "skill", skillId: "shocking_grasp" });
		}
	});

	it("falls back to an immune basic attack when no useful action exists", () => {
		const { enemy, player } = createCombatants();
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);
		const rngState = { value: 321 };

		expect(
			selectEnemyAction({ enemy, player: immunePlayer, tactic: "default", rngState }),
		).toEqual({ value: { type: "basicAttack" }, rngState });
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
	it.each([25, 20, 1])("repeatedly concedes at %i%% health while charges remain", (currentHp) => {
		const { enemy, player } = createCombatants();
		const conceder = {
			...withSkills(enemy, [{ skillId: "thou_hast_bested_me", chargesRemaining: 5 }]),
			maxHp: 100,
			currentHp,
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

	it("does not concede above quarter health or without a charge", () => {
		const { enemy, player } = createCombatants();
		const conceder = {
			...withSkills(enemy, [{ skillId: "thou_hast_bested_me", chargesRemaining: 5 }]),
			maxHp: 100,
			currentHp: 26,
		};
		const rngState = { value: 789 };

		expect(
			selectEnemyAction({ enemy: conceder, player, tactic: "conceder", rngState }).value,
		).toEqual({ type: "basicAttack" });
		expect(
			selectEnemyAction({
				enemy: {
					...conceder,
					currentHp: 25,
					skills: [{ skillId: "thou_hast_bested_me", chargesRemaining: 0 }],
				},
				player,
				tactic: "conceder",
				rngState,
			}).value,
		).toEqual({ type: "basicAttack" });
	});
});

describe("Binkus tactic", () => {
	it("forces each opening buff in order and retries an unspent buff", () => {
		const { enemy, player } = createCombatants();
		const rngState = { value: 246 };
		const skills = (
			[
				"globe_of_invulnerability",
				"piercing_magic",
				"embrace_elements",
				"binkus_deathray",
			] as const
		).map((skillId) => ({ skillId, chargesRemaining: SKILLS_BY_ID[skillId].maxUses! }));

		const select = (nextSkills: CombatantState["skills"]) =>
			selectEnemyAction({
				enemy: withSkills(enemy, nextSkills),
				player,
				tactic: "binkus",
				rngState,
			});

		expect(select(skills)).toEqual({
			value: { type: "skill", skillId: "globe_of_invulnerability" },
			rngState,
		});
		expect(select(skills).value).toEqual({
			type: "skill",
			skillId: "globe_of_invulnerability",
		});
		expect(
			select([
				{ ...skills[0], chargesRemaining: skills[0].chargesRemaining - 1 },
				...skills.slice(1),
			]).value,
		).toEqual({
			type: "skill",
			skillId: "piercing_magic",
		});
		expect(
			select([
				{ ...skills[0], chargesRemaining: skills[0].chargesRemaining - 1 },
				{ ...skills[1], chargesRemaining: skills[1].chargesRemaining - 1 },
				...skills.slice(2),
			]).value,
		).toEqual({ type: "skill", skillId: "embrace_elements" });
	});

	it("does not select setup buffs again after the opening", () => {
		const { enemy, player } = createCombatants();
		const setupSkills = (
			["globe_of_invulnerability", "piercing_magic", "embrace_elements"] as const
		).map((skillId) => ({ skillId, chargesRemaining: SKILLS_BY_ID[skillId].maxUses! - 1 }));
		const binkus = withSkills(enemy, [
			...setupSkills,
			{ skillId: "shocking_grasp", chargesRemaining: 12 },
		]);

		for (let value = 0; value < 20; value += 1) {
			const action = selectEnemyAction({
				enemy: binkus,
				player,
				tactic: "binkus",
				rngState: { value },
			}).value;

			expect(action).not.toEqual(
				expect.objectContaining({
					type: "skill",
					skillId: expect.stringMatching(
						/globe_of_invulnerability|piercing_magic|embrace_elements/,
					),
				}),
			);
		}
	});
});

function createCombatants() {
	return createTestCombat();
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
