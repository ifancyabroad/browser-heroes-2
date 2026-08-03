import { CLASSES_BY_ID, SKILLS_BY_ID } from "@app/content";

import {
	selectRandomItems,
	selectWeightedItems,
	type RngResult,
	type RngState,
} from "../../../core/rng";
import type { HeroState, LevelUpOption, PendingLevelUp } from "../../../schemas";
import { calculateLevelUpHpGain } from "../health/calculateLevelUpHpGain";
import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { getEligibleFeatOptions } from "./getEligibleFeatOptions";
import { getEligibleSkillOptions } from "./getEligibleSkillOptions";
import { getSkillRarityWeight } from "./skillRarityWeights";

const LEVEL_UP_OPTION_COUNT = 3;

export function createPendingLevelUp(
	hero: HeroState,
	rngState: RngState,
): RngResult<PendingLevelUp | null> {
	if (hero.pendingLevelUp) {
		return {
			value: hero.pendingLevelUp,
			rngState,
		};
	}

	const progression = getPendingLevelUp(hero);

	if (!progression) {
		return {
			value: null,
			rngState,
		};
	}

	const classDefinition = CLASSES_BY_ID[hero.classId];

	const hpGain = calculateLevelUpHpGain(
		classDefinition.combat.hitDie,
		hero.attributes.constitution,
	);

	const selected = selectLevelUpOptions(hero, progression.choice, rngState);

	return {
		value: {
			level: progression.level,
			hpGain,
			options: selected.value,
		},
		rngState: selected.rngState,
	};
}

function selectLevelUpOptions(
	hero: HeroState,
	choice: "skill" | "feat" | undefined,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	switch (choice) {
		case "skill": {
			const weightedOptions = getEligibleSkillOptions(hero).map((option) => ({
				value: option,
				weight: getSkillRarityWeight(SKILLS_BY_ID[option.skillId].rarity),
			}));

			return selectWeightedItems(weightedOptions, LEVEL_UP_OPTION_COUNT, rngState);
		}

		case "feat":
			return selectRandomItems(getEligibleFeatOptions(hero), LEVEL_UP_OPTION_COUNT, rngState);

		default:
			return {
				value: [],
				rngState,
			};
	}
}
