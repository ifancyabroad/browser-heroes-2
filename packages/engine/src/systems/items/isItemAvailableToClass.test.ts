import { ITEMS_BY_ID, items } from "@app/content";
import { describe, expect, it } from "vitest";

import { isItemAvailableToClass } from "./isItemAvailableToClass";

describe("isItemAvailableToClass", () => {
	it.each([
		["archmages_", "mage"],
		["centurions_", "battlemage"],
		["deathstalker_", "rogue"],
		["dreadfathers_", "priest"],
		["runesmiths_", "artificer"],
		["sunforged_", "paladin"],
		["umbral_", "shadowblade"],
		["unholy_", "warrior"],
	] as const)("restricts every %s armour set item to %s", (itemIdPrefix, classId) => {
		const setItems = items.filter(
			(item) => item.type === "armour" && item.id.startsWith(itemIdPrefix),
		);

		expect(setItems).toHaveLength(5);
		expect(setItems.every((item) => item.restrictedToClassIds?.length === 1)).toBe(true);
		expect(setItems.every((item) => item.restrictedToClassIds?.[0] === classId)).toBe(true);
	});

	it("allows an unrestricted item for every class", () => {
		expect(isItemAvailableToClass(ITEMS_BY_ID.robe_of_protection, "mage")).toBe(true);
		expect(isItemAvailableToClass(ITEMS_BY_ID.robe_of_protection, "priest")).toBe(true);
	});

	it("allows a restricted item only for a listed class", () => {
		expect(isItemAvailableToClass(ITEMS_BY_ID.archmages_robe, "mage")).toBe(true);
		expect(isItemAvailableToClass(ITEMS_BY_ID.archmages_robe, "priest")).toBe(false);
	});
});
