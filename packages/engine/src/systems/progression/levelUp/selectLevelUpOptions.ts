import {
	selectRandomItems,
	selectWeightedItems,
	type RngResult,
	type RngState,
} from "../../../core/rng";
import type { HeroState, LevelUpOption, PendingLevelUp } from "../../../schemas";
import { getLevelUpOptionCandidates, isLevelUpOptionEligible } from "./getLevelUpOptionCandidates";

const LEVEL_UP_OPTION_COUNT = 3;

export function selectLevelUpOptions(
	hero: HeroState,
	targetLevel: number,
	rngState: RngState,
): LevelUpOption[] {
	const ranked = rankLevelUpOptions(hero, targetLevel, rngState);

	return ranked.value
		.filter((option) => isLevelUpOptionEligible(hero, option))
		.slice(0, LEVEL_UP_OPTION_COUNT);
}

export function canRerollLevelUp(hero: HeroState, pending: PendingLevelUp): boolean {
	const currentType = pending.options[0]?.type;

	if (!currentType) {
		return false;
	}

	return getLevelUpOptionCandidates(hero.classId, pending.level).some(
		({ option }) =>
			option.type === currentType &&
			isLevelUpOptionEligible(hero, option) &&
			!pending.options.some((current) => isSameLevelUpOption(current, option)),
	);
}

export function rerollLevelUpOptions(
	hero: HeroState,
	pending: PendingLevelUp,
	rngState: RngState,
): LevelUpOption[] | null {
	const currentType = pending.options[0]?.type;

	if (!currentType) {
		return null;
	}

	const ranked = rankLevelUpOptions(hero, pending.level, rngState);
	const alternatives = ranked.value.filter(
		(option) =>
			option.type === currentType &&
			isLevelUpOptionEligible(hero, option) &&
			!pending.options.some((current) => isSameLevelUpOption(current, option)),
	);

	if (alternatives.length === 0) {
		return null;
	}

	const selectedAlternatives = alternatives.slice(0, LEVEL_UP_OPTION_COUNT);
	const fillCount = LEVEL_UP_OPTION_COUNT - selectedAlternatives.length;
	const fill = selectRandomItems(pending.options, fillCount, ranked.rngState);
	const shuffled = selectRandomItems(
		[...selectedAlternatives, ...fill.value],
		LEVEL_UP_OPTION_COUNT,
		fill.rngState,
	);

	return shuffled.value;
}

function rankLevelUpOptions(
	hero: HeroState,
	targetLevel: number,
	rngState: RngState,
): RngResult<LevelUpOption[]> {
	const candidates = getLevelUpOptionCandidates(hero.classId, targetLevel);

	return selectWeightedItems(
		candidates.map(({ option, weight }) => ({ value: option, weight })),
		candidates.length,
		rngState,
	);
}

function isSameLevelUpOption(first: LevelUpOption, second: LevelUpOption): boolean {
	if (first.type === "skill" && second.type === "skill") {
		return first.skillId === second.skillId;
	}

	return first.type === "feat" && second.type === "feat" && first.featId === second.featId;
}
