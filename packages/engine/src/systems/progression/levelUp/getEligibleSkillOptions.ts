import { CLASSES_BY_ID, skills, type ClassId } from "@app/content";

import type { HeroState, SkillLevelUpOption } from "../../../schemas";

export function getEligibleSkillOptions(hero: HeroState): SkillLevelUpOption[] {
	return getSkillLevelUpOptionsForClass(hero.classId).filter((option) =>
		isSkillLevelUpOptionEligible(hero, option),
	);
}

export function isSkillLevelUpOptionEligible(hero: HeroState, option: SkillLevelUpOption): boolean {
	return !hero.skills.some((skill) => skill.skillId === option.skillId);
}

export function getSkillLevelUpOptionsForClass(classId: ClassId): SkillLevelUpOption[] {
	const allowedPools = new Set(CLASSES_BY_ID[classId].skillPoolIds);

	return skills
		.filter((skill) => allowedPools.has(skill.pool))
		.map((skill) => ({
			type: "skill" as const,
			skillId: skill.id,
		}));
}
