import { CLASSES_BY_ID, skills } from "@app/content";

import type { HeroState, SkillLevelUpOption } from "../../../schemas";

export function getEligibleSkillOptions(hero: HeroState): SkillLevelUpOption[] {
	const classDefinition = CLASSES_BY_ID[hero.classId];

	const allowedPools = new Set(classDefinition.skillPoolIds);

	const ownedSkillIds = new Set(hero.skills.map((skill) => skill.skillId));

	return skills.flatMap((skill): SkillLevelUpOption[] => {
		if (!allowedPools.has(skill.pool)) {
			return [];
		}

		if (ownedSkillIds.has(skill.id)) {
			return [];
		}

		return [
			{
				type: "skill",
				skillId: skill.id,
			},
		];
	});
}
