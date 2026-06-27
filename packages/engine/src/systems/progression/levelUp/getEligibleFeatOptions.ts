import { feats } from "@app/content";

import type { FeatLevelUpOption, HeroState } from "../../../schemas";

export function getEligibleFeatOptions(hero: HeroState): FeatLevelUpOption[] {
	const ownedFeatIds = new Set(hero.featIds);

	return feats
		.filter((feat) => !ownedFeatIds.has(feat.id))
		.map((feat) => ({
			type: "feat" as const,
			featId: feat.id,
		}));
}
