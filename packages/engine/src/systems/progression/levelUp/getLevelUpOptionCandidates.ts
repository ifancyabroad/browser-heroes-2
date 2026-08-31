import { CLASSES_BY_ID, feats, skills, type ClassId } from "@app/content";

import type { HeroState, LevelUpOption } from "../../../schemas";
import { getLevelProgression } from "../level/getLevelProgression";

export type WeightedLevelUpOption = {
	option: LevelUpOption;
	weight: number;
};

export function getLevelUpOptionCandidates(
	classId: ClassId,
	targetLevel: number,
): WeightedLevelUpOption[] {
	const choice = getLevelProgression(targetLevel)?.choice;

	if (!choice) {
		return [];
	}

	if (choice.type === "feat") {
		return feats.map((feat) => ({
			option: { type: "feat", featId: feat.id },
			weight: 1,
		}));
	}

	const allowedPools = new Set(CLASSES_BY_ID[classId].skillPoolIds);

	return skills.flatMap((skill): WeightedLevelUpOption[] => {
		const weight = choice.rarityWeights[skill.rarity];

		if (!allowedPools.has(skill.pool) || weight === undefined) {
			return [];
		}

		return [{ option: { type: "skill", skillId: skill.id }, weight }];
	});
}

export function isLevelUpOptionEligible(hero: HeroState, option: LevelUpOption): boolean {
	if (option.type === "skill") {
		return !hero.skills.some((skill) => skill.skillId === option.skillId);
	}

	return !hero.featIds.includes(option.featId);
}
