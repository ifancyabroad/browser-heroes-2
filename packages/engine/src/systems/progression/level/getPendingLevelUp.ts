import type { HeroState } from "../../../schemas";

import { getLevelForXp } from "./getLevelForXp";
import { getLevelProgression } from "./getLevelProgression";

export function getPendingLevelUp(hero: HeroState) {
	const availableLevel = getLevelForXp(hero.xp);
	const nextLevel = hero.level + 1;

	if (nextLevel > availableLevel) {
		return null;
	}

	return getLevelProgression(nextLevel);
}
