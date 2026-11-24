import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import { calculateAttributeModifier } from "../../core/attributes";

const CHARISMA_DISCOUNT_DIVISOR = 15;

const BASE_REROLL_COST = 10;
const REROLL_MULTIPLIER = 1.5;

const BASE_REST_COST = 20;
const REST_MULTIPLIER = 1.25;

export function calculateTownDiscountMultiplier(effectiveCharisma: number): number {
	const charismaModifier = calculateAttributeModifier(effectiveCharisma);

	return Math.round((1 - charismaModifier / CHARISMA_DISCOUNT_DIVISOR) * 100) / 100;
}

export function calculateTownItemPrice(basePrice: number, effectiveCharisma: number): number {
	return Math.round(basePrice * calculateTownDiscountMultiplier(effectiveCharisma));
}

export function calculateRerollCost(
	effectiveCharisma: number,
	shopLevel: number,
	rerollCount: number,
): number {
	return Math.round(
		BASE_REROLL_COST *
			Math.max(1, shopLevel) *
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

export function calculateConsumableCost(
	consumableId: ConsumableId,
	effectiveCharisma: number,
	zoneNumber: number,
): number {
	return Math.round(
		CONSUMABLES_BY_ID[consumableId].basePrice *
			Math.max(1, zoneNumber) *
			calculateTownDiscountMultiplier(effectiveCharisma),
	);
}
