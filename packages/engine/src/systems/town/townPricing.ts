import { calculateAttributeModifier } from "../../core/attributes";

const BASE_REROLL_COST = 20;
const REROLL_MULTIPLIER = 1.5;

const BASE_REST_COST = 20;
const REST_MULTIPLIER = 1.25;

const BASE_HEALING_POTION_COST = 20;

export function calculateTownDiscountMultiplier(effectiveCharisma: number): number {
	const charismaModifier = calculateAttributeModifier(effectiveCharisma);

	return Math.round((1 - charismaModifier / 15) * 100) / 100;
}

export function calculateTownItemPrice(basePrice: number, effectiveCharisma: number): number {
	return Math.round(basePrice * calculateTownDiscountMultiplier(effectiveCharisma));
}

export function calculateRerollCost(effectiveCharisma: number, rerollCount: number): number {
	return Math.round(
		BASE_REROLL_COST *
			Math.pow(REROLL_MULTIPLIER, rerollCount) *
			calculateTownDiscountMultiplier(effectiveCharisma),
	);
}

export function calculateRestCost(effectiveCharisma: number, day: number): number {
	return Math.round(
		BASE_REST_COST *
			Math.pow(REST_MULTIPLIER, day - 1) *
			calculateTownDiscountMultiplier(effectiveCharisma),
	);
}

export function calculateShopLevel(zoneNumber: number): number {
	return Math.max(1, zoneNumber);
}

export function calculateHealingPotionCost(effectiveCharisma: number, zoneNumber: number): number {
	return Math.round(
		BASE_HEALING_POTION_COST *
			Math.max(1, zoneNumber) *
			calculateTownDiscountMultiplier(effectiveCharisma),
	);
}
