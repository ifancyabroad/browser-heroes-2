import type { Attribute } from "@app/content";

import type { HeroState } from "../../schemas";
import { MAX_ATTRIBUTE_SCORE } from "../../core/attributes";
import { deriveHeroStats } from "./deriveHeroStats";

export function hasReachedMaximumAttribute(hero: HeroState, attribute: Attribute): boolean {
	return deriveHeroStats(hero).effectiveAttributes[attribute] === MAX_ATTRIBUTE_SCORE;
}

export function hasReachedMaxHpThreshold(hero: HeroState, threshold: number): boolean {
	return deriveHeroStats(hero).health.maxHp >= threshold;
}

export function hasReachedArmourClassThreshold(hero: HeroState, threshold: number): boolean {
	return deriveHeroStats(hero).combatStats.armourClass.value >= threshold;
}
