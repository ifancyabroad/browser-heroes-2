import type { HeroState, LevelUpOption } from "../../../schemas";

import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { getEligibleFeatOptions } from "./getEligibleFeatOptions";
import { getEligibleSkillOptions } from "./getEligibleSkillOptions";

export function getPendingLevelUpOptions(hero: HeroState): LevelUpOption[] {
	const pendingLevelUp = getPendingLevelUp(hero);

	if (!pendingLevelUp?.choice) {
		return [];
	}

	switch (pendingLevelUp.choice) {
		case "skill":
			return getEligibleSkillOptions(hero);

		case "feat":
			return getEligibleFeatOptions(hero);
	}
}
