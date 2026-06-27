import { CLASSES_BY_ID, skills, type SkillRankValue } from "@app/content";

import type { HeroState, SkillLevelUpOption } from "../../../schemas";

export function getEligibleSkillOptions(hero: HeroState): SkillLevelUpOption[] {
	const classDefinition = CLASSES_BY_ID[hero.classId];

	const allowedPools = new Set(classDefinition.skillPoolIds);

	const ownedSkills = new Map(hero.skills.map((skill) => [skill.skillId, skill]));

	return skills.flatMap((skill): SkillLevelUpOption[] => {
		if (!allowedPools.has(skill.pool)) {
			return [];
		}

		const ownedSkill = ownedSkills.get(skill.id);

		if (!ownedSkill) {
			return [
				{
					type: "skill",
					skillId: skill.id,
					currentRank: null,
					resultingRank: 1,
				},
			];
		}

		if (ownedSkill.rank >= 3) {
			return [];
		}

		const resultingRank = (ownedSkill.rank + 1) as SkillRankValue;

		return [
			{
				type: "skill",
				skillId: skill.id,
				currentRank: ownedSkill.rank,
				resultingRank,
			},
		];
	});
}
