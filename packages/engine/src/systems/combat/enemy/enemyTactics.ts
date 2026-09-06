import { SKILLS_BY_ID, type Skill, type SkillId, type Tactic } from "@app/content";

import type { CombatantState } from "../../../schemas";

export type EnemyAction = { type: "basicAttack" } | { type: "skill"; skillId: SkillId };
export type StandardEnemyTactic = Exclude<Tactic, "conceder" | "binkus">;

export function getEnemyActionWeight(
	tactic: StandardEnemyTactic,
	enemy: CombatantState,
	action: EnemyAction,
): number {
	if (action.type === "basicAttack") {
		return getBasicAttackWeight(tactic, enemy);
	}

	return getSkillWeight(tactic, enemy, SKILLS_BY_ID[action.skillId]);
}

function getBasicAttackWeight(tactic: StandardEnemyTactic, enemy: CombatantState): number {
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

function getSkillWeight(tactic: StandardEnemyTactic, enemy: CombatantState, skill: Skill): number {
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
