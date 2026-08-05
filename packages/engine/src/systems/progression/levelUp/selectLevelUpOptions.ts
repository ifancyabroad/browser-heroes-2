import { SKILLS_BY_ID } from "@app/content";

import {
	selectRandomItems,
	selectWeightedItems,
	type RngResult,
	type RngState,
} from "../../../core/rng";
import type { HeroState, LevelUpOption } from "../../../schemas";
import { getEligibleFeatOptions } from "./getEligibleFeatOptions";
import { getEligibleSkillOptions } from "./getEligibleSkillOptions";
import { getSkillRarityWeight } from "./skillRarityWeights";

const LEVEL_UP_OPTION_COUNT = 3;

export function selectLevelUpOptions(
	hero: HeroState,
	choice: "skill" | "feat" | undefined,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	return selectOptions(getEligibleOptions(hero, choice), choice, LEVEL_UP_OPTION_COUNT, rngState);
}

export function canRerollLevelUp(
	hero: HeroState,
	currentOptions: readonly LevelUpOption[],
): boolean {
	const choice = currentOptions[0]?.type;

	if (!choice) {
		return false;
	}

	const currentKeys = new Set(currentOptions.map(getOptionKey));
	return getEligibleOptions(hero, choice).some(
		(option) => !currentKeys.has(getOptionKey(option)),
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

	const currentKeys = new Set(currentOptions.map(getOptionKey));
	const alternatives = getEligibleOptions(hero, choice).filter(
		(option) => !currentKeys.has(getOptionKey(option)),
	);

	if (alternatives.length === 0) {
		return null;
	}

	const selectedAlternatives = selectOptions(
		alternatives,
		choice,
		LEVEL_UP_OPTION_COUNT,
		rngState,
	);
	const fillCount = LEVEL_UP_OPTION_COUNT - selectedAlternatives.value.length;
	const fill = selectRandomItems(currentOptions, fillCount, selectedAlternatives.rngState);
	const shuffled = selectRandomItems(
		[...selectedAlternatives.value, ...fill.value],
		LEVEL_UP_OPTION_COUNT,
		fill.rngState,
	);

	return shuffled;
}

function getEligibleOptions(
	hero: HeroState,
	choice: "skill" | "feat" | undefined,
): LevelUpOption[] {
	if (choice === "skill") {
		return getEligibleSkillOptions(hero);
	}

	if (choice === "feat") {
		return getEligibleFeatOptions(hero);
	}

	return [];
}

function selectOptions(
	options: readonly LevelUpOption[],
	choice: "skill" | "feat" | undefined,
	count: number,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	if (choice === "skill") {
		return selectWeightedItems(
			options.map((option) => ({
				value: option,
				weight:
					option.type === "skill"
						? getSkillRarityWeight(SKILLS_BY_ID[option.skillId].rarity)
						: 0,
			})),
			count,
			rngState,
		);
	}

	return selectRandomItems(options, count, rngState);
}

function getOptionKey(option: LevelUpOption): string {
	return option.type === "skill" ? `skill:${option.skillId}` : `feat:${option.featId}`;
}
