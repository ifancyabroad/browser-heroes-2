import type { RunState } from "../schemas";

import { MAX_HERO_LEVEL } from "../systems/progression/constants/levelProgression";
import { getLevelForXp } from "../systems/progression/level/getLevelForXp";
import { getLevelProgression } from "../systems/progression/level/getLevelProgression";
import { getNextLevelXp } from "../systems/progression/level/getNextLevelXp";

export type HeroProgressionView = {
	level: number;
	xp: number;
	maxLevel: number;
	currentLevelXp: number;
	nextLevelXp: number | null;
	availableLevel: number;
	canLevelUp: boolean;
	pendingLevelUp: RunState["hero"]["pendingLevelUp"];
	resultingMaxHp: number | null;
};

export function selectHeroProgression(state: RunState): HeroProgressionView {
	const { hero } = state;
	const { pendingLevelUp } = hero;

	return {
		level: hero.level,
		xp: hero.xp,
		maxLevel: MAX_HERO_LEVEL,
		currentLevelXp: getLevelProgression(hero.level)?.requiredXp ?? 0,
		nextLevelXp: getNextLevelXp(hero.level),
		availableLevel: getLevelForXp(hero.xp),
		canLevelUp: pendingLevelUp !== null,
		pendingLevelUp,
		resultingMaxHp: pendingLevelUp ? hero.maxHp + pendingLevelUp.hpGain : null,
	};
}
