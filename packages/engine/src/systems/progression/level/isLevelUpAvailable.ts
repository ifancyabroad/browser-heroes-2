import type { HeroState } from "../../../schemas";

import { MAX_HERO_LEVEL } from "../constants/levelProgression";
import { getLevelForXp } from "./getLevelForXp";

export function isLevelUpAvailable(hero: HeroState): boolean {
	if (hero.level >= MAX_HERO_LEVEL) {
		return false;
	}

	return getLevelForXp(hero.xp) > hero.level;
}
