import { SKILLS_BY_ID, type Skill, type SkillId, type Tactic } from "@app/content";

import type { CombatantState } from "../../../schemas";

import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";

export type EnemyAction = { type: "basicAttack" } | { type: "skill"; skillId: SkillId };

const CONCEDE_SKILL_ID: SkillId = "thou_hast_bested_me";

export function getForcedTacticAction(tactic: Tactic, enemy: CombatantState): EnemyAction | null {
	if (
		tactic === "conceder" &&
		enemy.currentHp <= enemy.maxHp / 2 &&
		validateCombatantSkillUse(enemy, CONCEDE_SKILL_ID).ok
	) {
		return { type: "skill", skillId: CONCEDE_SKILL_ID };
	}

	return null;
}

export function getEnemyActionWeight(
	tactic: Tactic,
	enemy: CombatantState,
	action: EnemyAction,
): number {
	const standardTactic = tactic === "conceder" ? "default" : tactic;

	if (action.type === "basicAttack") {
		return getBasicAttackWeight(standardTactic, enemy);
	}

	return getSkillWeight(standardTactic, enemy, SKILLS_BY_ID[action.skillId]);
}

function getBasicAttackWeight(tactic: Exclude<Tactic, "conceder">, enemy: CombatantState): number {
	switch (tactic) {
		case "caster":
			return 1;
		case "defensive":
			return enemy.currentHp <= enemy.maxHp / 2 ? 1 : 3;
		case "random":
			return 1;
		case "aggressive":
		case "default":
			return 3;
	}
}

function getSkillWeight(
	tactic: Exclude<Tactic, "conceder">,
	enemy: CombatantState,
	skill: Skill,
): number {
	if (tactic === "random") {
		return 1;
	}

	const offensive = hasOffensiveEffect(skill);
	const restorative = skill.effects.some(
		(effect) => effect.type === "heal" || effect.type === "healOverTime",
	);
	const defensive = restorative || skill.category === "buff" || skill.category === "defensive";

	switch (tactic) {
		case "caster":
			return 6;
		case "aggressive":
			return offensive ? 7 : 1;
		case "defensive":
			if (enemy.currentHp <= enemy.maxHp / 2) {
				return restorative ? 9 : defensive ? 6 : offensive ? 2 : 1;
			}
			return offensive ? 3 : 1;
		case "default":
			return restorative && enemy.currentHp <= enemy.maxHp / 2 ? 5 : offensive ? 3 : 2;
	}
}

function hasOffensiveEffect(skill: Skill): boolean {
	return skill.effects.some(
		(effect) =>
			effect.target === "enemy" &&
			(effect.type === "damage" ||
				effect.type === "attackDamage" ||
				effect.type === "damageOverTime" ||
				effect.type === "applyStatus" ||
				skill.category === "debuff"),
	);
}
