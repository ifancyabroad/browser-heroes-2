import type { HeroState } from "../../schemas";
import { calculateAttributeModifier } from "../../core/attributes";

export const BASE_REROLL_PRICE = 20;
export const REROLL_MULTIPLIER = 1.5;

export const BASE_REST_PRICE = 20;
export const REST_MULTIPLIER = 1.25;

export function calculateTownDiscountMultiplier(hero: HeroState): number {
	const charismaModifier = calculateAttributeModifier(hero.attributes.charisma);

	return Math.round((1 - charismaModifier / 15) * 100) / 100;
}

export function calculateRerollCost(hero: HeroState, rerollCount: number): number {
	return Math.round(
		BASE_REROLL_PRICE *
			Math.pow(REROLL_MULTIPLIER, rerollCount) *
			calculateTownDiscountMultiplier(hero),
	);
}

export function calculateRestCost(hero: HeroState, restCount: number): number {
	return Math.round(
		BASE_REST_PRICE *
			Math.pow(REST_MULTIPLIER, restCount) *
			calculateTownDiscountMultiplier(hero),
	);
}

export function calculateShopLevel(battleNumber: number): number {
	return Math.max(1, Math.floor(battleNumber / 10));
}
