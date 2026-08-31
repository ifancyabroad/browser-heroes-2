import type { PendingLevelUp, RunState } from "../schemas";

import { MAX_HERO_LEVEL } from "../systems/progression/constants/levelProgression";
import { getLevelForXp } from "../systems/progression/level/getLevelForXp";
import { getLevelProgression } from "../systems/progression/level/getLevelProgression";
import { getNextLevelXp } from "../systems/progression/level/getNextLevelXp";
import { deriveHeroStats } from "../systems/hero/deriveHeroStats";
import { canRerollLevelUp } from "../systems/progression/levelUp/selectLevelUpOptions";

export type HeroProgressionView = {
	level: number;
	xp: number;
	maxLevel: number;
	currentLevelXp: number;
	nextLevelXp: number | null;
	availableLevel: number;
	canLevelUp: boolean;
	pendingLevelUp: PendingLevelUp | null;
	resultingMaxHp: number | null;
	levelUpRerolls: number;
	canRerollLevelUp: boolean;
};

export function selectHeroProgression(state: RunState): HeroProgressionView {
	const { hero } = state;
	const { pendingLevelUp } = hero;
	const effectiveMaxHp = deriveHeroStats(hero).health.maxHp;

	return {
		level: hero.level,
		xp: hero.xp,
		maxLevel: MAX_HERO_LEVEL,
		currentLevelXp: getLevelProgression(hero.level)?.requiredXp ?? 0,
		nextLevelXp: getNextLevelXp(hero.level),
		availableLevel: getLevelForXp(hero.xp),
		canLevelUp: pendingLevelUp !== null,
		pendingLevelUp,
		resultingMaxHp: pendingLevelUp ? effectiveMaxHp + pendingLevelUp.hpGain : null,
		levelUpRerolls: state.levelUpRerolls,
		canRerollLevelUp:
			state.levelUpRerolls > 0 &&
			pendingLevelUp !== null &&
			canRerollLevelUp(hero, pendingLevelUp),
	};
}
