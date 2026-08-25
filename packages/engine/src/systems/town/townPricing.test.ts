import { describe, expect, it } from "vitest";
import {
	calculateHealingPotionCost,
	calculateRerollCost,
	calculateRestCost,
	calculateShopLevel,
	calculateTownDiscountMultiplier,
	calculateTownItemPrice,
} from "./townPricing";

describe("town pricing", () => {
	it("uses the cumulative zone as the shop level", () => {
		expect(calculateShopLevel(1)).toBe(1);
		expect(calculateShopLevel(11)).toBe(11);
		expect(calculateShopLevel(21)).toBe(21);
	});

	it.each([
		[10, 1],
		[12, 0.93],
		[18, 0.73],
		[30, 0.33],
		[8, 1.07],
	] as const)("calculates charisma %i discount multiplier", (charisma, expected) => {
		expect(calculateTownDiscountMultiplier(charisma)).toBe(expected);
	});

	it("applies and rounds item discounts", () => {
		expect(calculateTownItemPrice(99, 18)).toBe(72);
		expect(calculateTownItemPrice(99, 10)).toBe(99);
	});

	it("increases reroll cost with shop level and each reroll", () => {
		expect(calculateRerollCost(10, 1, 0)).toBe(10);
		expect(calculateRerollCost(10, 5, 0)).toBe(50);
		expect(calculateRerollCost(10, 5, 1)).toBe(75);
		expect(calculateRerollCost(10, 5, 2)).toBe(113);
	});

	it("continues scaling reroll cost beyond the final shop loot tier", () => {
		expect(calculateRerollCost(10, 11, 0)).toBe(110);
		expect(calculateRerollCost(18, 11, 0)).toBe(80);
	});

	it("increases rest cost with each day", () => {
		expect(calculateRestCost(10, 1)).toBe(20);
		expect(calculateRestCost(10, 2)).toBe(25);
		expect(calculateRestCost(10, 3)).toBe(31);
	});

	it("scales healing potion cost by zone and charisma", () => {
		expect(calculateHealingPotionCost(10, 1)).toBe(20);
		expect(calculateHealingPotionCost(10, 3)).toBe(60);
		expect(calculateHealingPotionCost(10, 11)).toBe(220);
		expect(calculateHealingPotionCost(10, 21)).toBe(420);
		expect(calculateHealingPotionCost(18, 3)).toBe(44);
	});
});
