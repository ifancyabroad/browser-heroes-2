import type { HeroState } from "../../schemas";
import { calculateAttributeModifier } from "../../core/attributes";

const BASE_REROLL_COST = 20;
const REROLL_MULTIPLIER = 1.5;

const BASE_REST_COST = 20;
const REST_MULTIPLIER = 1.25;

const BASE_HEALING_POTION_COST = 20;

export function calculateTownDiscountMultiplier(hero: HeroState): number {
	const charismaModifier = calculateAttributeModifier(hero.attributes.charisma);

	return Math.round((1 - charismaModifier / 15) * 100) / 100;
}

export function calculateRerollCost(hero: HeroState, rerollCount: number): number {
	return Math.round(
		BASE_REROLL_COST *
			Math.pow(REROLL_MULTIPLIER, rerollCount) *
			calculateTownDiscountMultiplier(hero),
	);
}

export function calculateRestCost(hero: HeroState, restCount: number): number {
	return Math.round(
		BASE_REST_COST *
			Math.pow(REST_MULTIPLIER, restCount) *
			calculateTownDiscountMultiplier(hero),
	);
}

export function calculateShopLevel(zoneNumber: number): number {
	return Math.max(1, zoneNumber);
}

export function calculateHealingPotionCost(hero: HeroState, zoneNumber: number): number {
	return Math.round(
		BASE_HEALING_POTION_COST * Math.max(1, zoneNumber) * calculateTownDiscountMultiplier(hero),
	);
}
