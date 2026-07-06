import { SKILLS_BY_ID } from "@app/content";

import type { HeroSkillState } from "../../schemas";

export function restoreHeroSkillCharges(skills: readonly HeroSkillState[]): HeroSkillState[] {
	return skills.map((heroSkill) => {
		const skill = SKILLS_BY_ID[heroSkill.skillId];

		if (!skill || skill.maxUses === undefined) {
			return heroSkill;
		}

		return {
			...heroSkill,
			chargesRemaining: skill.maxUses,
		};
	});
}
