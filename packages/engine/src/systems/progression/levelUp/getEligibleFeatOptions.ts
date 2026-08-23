import { feats } from "@app/content";

import type { FeatLevelUpOption, HeroState } from "../../../schemas";

export function getEligibleFeatOptions(hero: HeroState): FeatLevelUpOption[] {
	return getFeatLevelUpOptions().filter((option) => isFeatLevelUpOptionEligible(hero, option));
}

export function isFeatLevelUpOptionEligible(hero: HeroState, option: FeatLevelUpOption): boolean {
	return !hero.featIds.includes(option.featId);
}

export function getFeatLevelUpOptions(): FeatLevelUpOption[] {
	return feats.map((feat) => ({
		type: "feat" as const,
		featId: feat.id,
	}));
}
