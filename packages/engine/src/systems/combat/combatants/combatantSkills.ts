import { SKILLS_BY_ID, type Enemy } from "@app/content";

import type { CombatantSkillState, HeroSkillState } from "../../../schemas";

export function createCombatantSkillFromHeroSkill(skill: HeroSkillState): CombatantSkillState {
	return {
		skillId: skill.skillId,
		rank: skill.rank,
		chargesRemaining: skill.chargesRemaining,
	};
}

export function createCombatantSkillFromEnemySkill(
	skill: Enemy["combat"]["skills"][number],
): CombatantSkillState {
	const definition = SKILLS_BY_ID[skill.skillId];

	return {
		skillId: skill.skillId,
		rank: skill.rank,
		chargesRemaining: definition.maxUses,
	};
}
