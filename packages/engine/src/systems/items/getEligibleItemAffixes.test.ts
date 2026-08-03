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

	it("uses base damage rather than weapon family for exceptional weapons", () => {
		const morningstarAffixes = getAffixIds(
			ITEMBASES_BY_ID.base_morningstar,
			"uncommon",
			"prefix",
		);

		expect(morningstarAffixes).toContain("barbed");
		expect(morningstarAffixes).toContain("puncturing");
		expect(morningstarAffixes).not.toContain("forceful");
		expect(morningstarAffixes).not.toContain("concussive");
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

	it("retains a valid affix pool for every eligible non-common base and rarity", () => {
		for (const base of Object.values(ITEMBASES_BY_ID)) {
			for (const rarity of itemAffixRarities) {
				const prefixes = getEligibleItemAffixes({ item: base, rarity, position: "prefix" });
				const suffixes = getEligibleItemAffixes({ item: base, rarity, position: "suffix" });

				if (rarity === "uncommon") {
					expect(
						prefixes.length + suffixes.length,
						`${base.id} ${rarity}`,
					).toBeGreaterThan(0);
					continue;
				}

				expect(prefixes.length, `${base.id} ${rarity} prefixes`).toBeGreaterThan(0);
				expect(suffixes.length, `${base.id} ${rarity} suffixes`).toBeGreaterThan(0);
			}
		}
	});
});
