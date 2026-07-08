import { SKILLS_BY_ID, type Enemy } from "@app/content";

import type { CombatantSkillState, HeroSkillState } from "../../../schemas";

export function createCombatantSkillFromHeroSkill(skill: HeroSkillState): CombatantSkillState {
	return {
		skillId: skill.skillId,
		chargesRemaining: skill.chargesRemaining,
	};
}

export function createCombatantSkillFromEnemySkill(
	skillId: Enemy["combat"]["skillIds"][number],
): CombatantSkillState {
	const definition = SKILLS_BY_ID[skillId];

	return {
		skillId,
		chargesRemaining: definition.maxUses,
	};
}
