import { ITEMBASES_BY_ID, itemAffixSchema } from "@app/content";
import { describe, expect, it } from "vitest";

import { getEligibleItemAffixes } from "./getEligibleItemAffixes";

function getAffixIds(
	base: (typeof ITEMBASES_BY_ID)[keyof typeof ITEMBASES_BY_ID],
	rarity: "uncommon" | "rare" | "epic",
	position: "prefix" | "suffix",
) {
	return getEligibleItemAffixes({ item: base, rarity, position }).map((affix) => affix.id);
}

describe("getEligibleItemAffixes", () => {
	it("requires applicability to use the canonical rule array", () => {
		expect(
			itemAffixSchema.safeParse({
				id: "legacy_applicability_shape",
				name: "Legacy Applicability Shape",
				position: "prefix",
				rarity: "uncommon",
				appliesTo: { itemTypes: ["weapon"] },
				modifiers: [{ type: "modifyStat", stat: "attackBonus", value: 1 }],
			}).success,
		).toBe(false);
	});

	it("uses OR between applicability rules and AND within each rule", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix")).toContain("precise");
		expect(getAffixIds(ITEMBASES_BY_ID.base_helmet, "rare", "prefix")).toContain("precise");
		expect(getAffixIds(ITEMBASES_BY_ID.base_boots, "rare", "prefix")).not.toContain("precise");
	});

	it("filters by rarity and position", () => {
		const rarePrefixes = getEligibleItemAffixes({
			item: ITEMBASES_BY_ID.base_longsword,
			rarity: "rare",
			position: "prefix",
		});

		expect(rarePrefixes.length).toBeGreaterThan(0);
		expect(rarePrefixes.every((affix) => affix.rarity === "rare")).toBe(true);
		expect(rarePrefixes.every((affix) => affix.position === "prefix")).toBe(true);
	});

	it("does not apply weapon-only restrictions to armour", () => {
		const armourPrefixes = getAffixIds(ITEMBASES_BY_ID.base_plate_armour, "uncommon", "prefix");

		expect(armourPrefixes).not.toContain("sharp");
		expect(armourPrefixes).not.toContain("barbed");
		expect(armourPrefixes).not.toContain("forceful");
	});
});
