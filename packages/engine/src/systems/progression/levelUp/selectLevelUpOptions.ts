import { SKILLS_BY_ID, type ClassId } from "@app/content";

import {
	selectRandomItems,
	selectWeightedItems,
	type RngResult,
	type RngState,
} from "../../../core/rng";
import type { HeroState, LevelUpOption } from "../../../schemas";
import {
	getEligibleFeatOptions,
	getFeatLevelUpOptions,
	isFeatLevelUpOptionEligible,
} from "./getEligibleFeatOptions";
import {
	getEligibleSkillOptions,
	getSkillLevelUpOptionsForClass,
	isSkillLevelUpOptionEligible,
} from "./getEligibleSkillOptions";
import { getSkillRarityWeight } from "./skillRarityWeights";

const LEVEL_UP_OPTION_COUNT = 3;

export function selectLevelUpOptions(
	hero: HeroState,
	choice: "skill" | "feat" | undefined,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	const ranked = rankLevelUpOptions(hero.classId, choice, rngState);

	return {
		value: ranked.value
			.filter((option) => isLevelUpOptionEligible(hero, option))
			.slice(0, LEVEL_UP_OPTION_COUNT),
		rngState: ranked.rngState,
	};
}

export function canRerollLevelUp(
	hero: HeroState,
	currentOptions: readonly LevelUpOption[],
): boolean {
	const choice = currentOptions[0]?.type;

	if (!choice) {
		return false;
	}

	const eligibleOptions =
		choice === "skill" ? getEligibleSkillOptions(hero) : getEligibleFeatOptions(hero);

	return eligibleOptions.some(
		(option) => !currentOptions.some((current) => isSameLevelUpOption(current, option)),
	);
}

export function rerollLevelUpOptions(
	hero: HeroState,
	currentOptions: readonly LevelUpOption[],
	rngState: RngState,
): RngResult<LevelUpOption[]> | null {
	const choice = currentOptions[0]?.type;

	if (!choice) {
		return null;
	}

	const ranked = rankLevelUpOptions(hero.classId, choice, rngState);
	const alternatives = ranked.value.filter(
		(option) =>
			isLevelUpOptionEligible(hero, option) &&
			!currentOptions.some((current) => isSameLevelUpOption(current, option)),
	);

	if (alternatives.length === 0) {
		return null;
	}

	const selectedAlternatives = alternatives.slice(0, LEVEL_UP_OPTION_COUNT);
	const fillCount = LEVEL_UP_OPTION_COUNT - selectedAlternatives.length;
	const fill = selectRandomItems(currentOptions, fillCount, ranked.rngState);
	const shuffled = selectRandomItems(
		[...selectedAlternatives, ...fill.value],
		LEVEL_UP_OPTION_COUNT,
		fill.rngState,
	);

	return shuffled;
}

function rankLevelUpOptions(
	classId: ClassId,
	choice: "skill" | "feat" | undefined,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	if (choice === "skill") {
		const options = getSkillLevelUpOptionsForClass(classId);

		return selectWeightedItems(
			options.map((option) => ({
				value: option,
				weight: getSkillRarityWeight(SKILLS_BY_ID[option.skillId].rarity),
			})),
			options.length,
			rngState,
		);
	}

	if (choice === "feat") {
		const options = getFeatLevelUpOptions();
		return selectRandomItems(options, options.length, rngState);
	}

	return { value: [], rngState };
}

function isLevelUpOptionEligible(hero: HeroState, option: LevelUpOption): boolean {
	if (option.type === "skill") {
		return isSkillLevelUpOptionEligible(hero, option);
	}

	return isFeatLevelUpOptionEligible(hero, option);
}

function isSameLevelUpOption(first: LevelUpOption, second: LevelUpOption): boolean {
	if (first.type === "skill" && second.type === "skill") {
		return first.skillId === second.skillId;
	}

	return first.type === "feat" && second.type === "feat" && first.featId === second.featId;
}
