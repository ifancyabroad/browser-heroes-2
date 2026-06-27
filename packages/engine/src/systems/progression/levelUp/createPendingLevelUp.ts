import { CLASSES_BY_ID } from "@app/content";

import { selectRandomItems, type RngResult, type RngState } from "../../../core/rng";
import type { HeroState, LevelUpOption, PendingLevelUp } from "../../../schemas";
import { calculateLevelUpHpGain } from "../health/calculateLevelUpHpGain";
import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { getEligibleFeatOptions } from "./getEligibleFeatOptions";
import { getEligibleSkillOptions } from "./getEligibleSkillOptions";

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

	const eligibleOptions = getEligibleOptions(hero, progression.choice);

	const selected = selectRandomItems(eligibleOptions, LEVEL_UP_OPTION_COUNT, rngState);

	return {
		value: {
			level: progression.level,
			hpGain,
			options: selected.value,
		},
		rngState: selected.rngState,
	};
}

function getEligibleOptions(
	hero: HeroState,
	choice: "skill" | "feat" | undefined,
): LevelUpOption[] {
	switch (choice) {
		case "skill":
			return getEligibleSkillOptions(hero);

		case "feat":
			return getEligibleFeatOptions(hero);

		default:
			return [];
	}
}
