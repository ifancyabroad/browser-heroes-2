import { CLASSES_BY_ID, ITEMS_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { isClassProficientWithItem } from "./isClassProficientWithItem";

describe("isClassProficientWithItem", () => {
	it("checks weapon and armour proficiency independently of authored restrictions", () => {
		expect(isClassProficientWithItem(CLASSES_BY_ID.mage, ITEMS_BY_ID.archmages_robe)).toBe(
			true,
		);
		expect(isClassProficientWithItem(CLASSES_BY_ID.priest, ITEMS_BY_ID.archmages_robe)).toBe(
			true,
		);
		expect(isClassProficientWithItem(CLASSES_BY_ID.mage, ITEMS_BY_ID.sunforged_plate)).toBe(
			false,
		);
	});
});
