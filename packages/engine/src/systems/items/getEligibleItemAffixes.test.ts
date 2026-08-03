import {
	ITEMBASES_BY_ID,
	itemAffixRarities,
	type ItemAffixRarity,
	type ItemBase,
} from "@app/content";
import { describe, expect, it } from "vitest";

import { getEligibleItemAffixes } from "./getEligibleItemAffixes";

function getAffixIds(base: ItemBase, rarity: ItemAffixRarity, position: "prefix" | "suffix") {
	return getEligibleItemAffixes({ item: base, rarity, position }).map((affix) => affix.id);
}

describe("getEligibleItemAffixes", () => {
	it("matches physical affixes to the weapon's base damage type", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "uncommon", "prefix")).toContain(
			"sharp",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "uncommon", "prefix")).not.toContain(
			"sharp",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "uncommon", "prefix")).toContain("barbed");
	});

	it("combines weapon family and damage type restrictions", () => {
		const morningstarAffixes = getAffixIds(
			ITEMBASES_BY_ID.base_morningstar,
			"uncommon",
			"prefix",
		);

		expect(morningstarAffixes).not.toContain("barbed");
		expect(morningstarAffixes).not.toContain("puncturing");
		expect(morningstarAffixes).not.toContain("forceful");
		expect(morningstarAffixes).not.toContain("concussive");
	});

	it("keeps specialised weapon riders within their thematic families", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_hammer, "epic", "prefix")).toContain("stunning");
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "epic", "prefix")).not.toContain(
			"stunning",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_fire_wand, "epic", "prefix")).toContain(
			"silencing",
		);
	});

	it("keeps defensive and resistance affixes within their thematic armour slots", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_plate_armour, "uncommon", "prefix")).toContain(
			"reinforced",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_boots, "uncommon", "prefix")).not.toContain(
			"reinforced",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_boots, "rare", "suffix")).toContain("of_warmth");
		expect(getAffixIds(ITEMBASES_BY_ID.base_gauntlets, "rare", "suffix")).not.toContain(
			"of_warmth",
		);
	});

	it("does not apply base damage restrictions to armour", () => {
		const bodyArmourAffixes = getAffixIds(
			ITEMBASES_BY_ID.base_plate_armour,
			"uncommon",
			"prefix",
		);

		expect(bodyArmourAffixes).not.toContain("sharp");
		expect(bodyArmourAffixes).not.toContain("barbed");
		expect(bodyArmourAffixes).not.toContain("forceful");
	});

	it("retains at least three choices in every required affix pool", () => {
		for (const base of Object.values(ITEMBASES_BY_ID)) {
			for (const rarity of itemAffixRarities) {
				const prefixes = getEligibleItemAffixes({ item: base, rarity, position: "prefix" });
				const suffixes = getEligibleItemAffixes({ item: base, rarity, position: "suffix" });

				if (rarity === "uncommon") {
					expect(
						prefixes.length + suffixes.length,
						`${base.id} ${rarity}`,
					).toBeGreaterThanOrEqual(3);
					continue;
				}

				expect(prefixes.length, `${base.id} ${rarity} prefixes`).toBeGreaterThanOrEqual(3);
				expect(suffixes.length, `${base.id} ${rarity} suffixes`).toBeGreaterThanOrEqual(3);
			}
		}
	});
});
