import {
	ITEMAFFIXES_BY_ID,
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
	it("provides complete attribute and maximum HP rarity progressions", () => {
		expect(ITEMAFFIXES_BY_ID.of_might.modifiers).toContainEqual({
			type: "modifyStat",
			stat: "strength",
			value: 1,
		});
		expect(ITEMAFFIXES_BY_ID.powerful.modifiers).toContainEqual({
			type: "modifyStat",
			stat: "strength",
			value: 2,
		});
		expect(ITEMAFFIXES_BY_ID.titanic.modifiers).toContainEqual({
			type: "modifyStat",
			stat: "strength",
			value: 4,
		});
		expect([
			ITEMAFFIXES_BY_ID.of_vigor.modifiers[0],
			ITEMAFFIXES_BY_ID.of_vitality.modifiers[0],
			ITEMAFFIXES_BY_ID.of_immortality.modifiers[0],
		]).toEqual([
			{ type: "modifyStat", stat: "maxHpBonus", value: 5 },
			{ type: "modifyStat", stat: "maxHpBonus", value: 10 },
			{ type: "modifyStat", stat: "maxHpBonus", value: 20 },
		]);
	});

	it("provides weighted typed damage progressions through every rarity", () => {
		const progressions = [
			["searing", "of_embers", "of_conflagration"],
			["glacial", "of_rime", "of_the_glacier"],
			["charged", "of_storms", "of_the_tempest"],
			["caustic", "of_corrosion", "of_dissolution"],
			["venomous", "of_venom", "of_pestilence"],
			["deathly", "of_decay", "of_oblivion"],
			["blessed", "of_light", "of_the_sun"],
		] as const;

		for (const [uncommonId, rareId, epicId] of progressions) {
			expect(ITEMAFFIXES_BY_ID[uncommonId].modifiers[0]).toMatchObject({ value: 1 });
			expect(ITEMAFFIXES_BY_ID[rareId]).toMatchObject({ weight: 0.5 });
			expect(ITEMAFFIXES_BY_ID[rareId].modifiers[0]).toMatchObject({ value: 2 });
			expect(ITEMAFFIXES_BY_ID[epicId]).toMatchObject({ weight: 0.5 });
			expect(ITEMAFFIXES_BY_ID[epicId].modifiers[0]).toMatchObject({ value: 4 });
		}
	});

	it("keeps conditional typed damage below half of each selectable weighted pool", () => {
		const typedDamageIds = new Set([
			"searing",
			"glacial",
			"charged",
			"caustic",
			"venomous",
			"deathly",
			"blessed",
			"of_embers",
			"of_rime",
			"of_storms",
			"of_corrosion",
			"of_venom",
			"of_decay",
			"of_light",
			"of_conflagration",
			"of_the_glacier",
			"of_the_tempest",
			"of_dissolution",
			"of_pestilence",
			"of_oblivion",
			"of_the_sun",
		]);

		for (const base of Object.values(ITEMBASES_BY_ID)) {
			for (const rarity of itemAffixRarities) {
				const positions = rarity === "uncommon" ? (["prefix", "suffix"] as const) : null;
				const pools = positions
					? [
							positions.flatMap((position) =>
								getEligibleItemAffixes({ item: base, rarity, position }),
							),
						]
					: (["prefix", "suffix"] as const).map((position) =>
							getEligibleItemAffixes({ item: base, rarity, position }),
						);

				for (const pool of pools) {
					const totalWeight = pool.reduce((total, affix) => total + affix.weight, 0);
					const typedWeight = pool
						.filter((affix) => typedDamageIds.has(affix.id))
						.reduce((total, affix) => total + affix.weight, 0);

					expect(typedWeight / totalWeight, `${base.id} ${rarity}`).toBeLessThan(0.5);
				}
			}
		}
	});

	it("provides a distinct rare and epic rider for every elemental damage type", () => {
		const rareRiders = [
			"corroding",
			"incendiary",
			"chilling",
			"disrupting",
			"virulent",
			"withering",
			"consecrated",
		];
		const epicRiders = [
			"dissolving",
			"infernal",
			"deep_freezing",
			"thunderous",
			"plague_bearing",
			"soul_draining",
			"sun_blessed",
		];

		const swordRarePrefixes = getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix");
		const swordEpicPrefixes = getAffixIds(ITEMBASES_BY_ID.base_longsword, "epic", "prefix");

		expect(swordRarePrefixes).toEqual(expect.arrayContaining(rareRiders));
		expect(swordEpicPrefixes).toEqual(expect.arrayContaining(epicRiders));
	});

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

	it("retains at least five choices in every required affix pool", () => {
		for (const base of Object.values(ITEMBASES_BY_ID)) {
			for (const rarity of itemAffixRarities) {
				const prefixes = getEligibleItemAffixes({ item: base, rarity, position: "prefix" });
				const suffixes = getEligibleItemAffixes({ item: base, rarity, position: "suffix" });

				if (rarity === "uncommon") {
					expect(
						prefixes.length + suffixes.length,
						`${base.id} ${rarity}`,
					).toBeGreaterThanOrEqual(5);
					continue;
				}

				expect(prefixes.length, `${base.id} ${rarity} prefixes`).toBeGreaterThanOrEqual(5);
				expect(suffixes.length, `${base.id} ${rarity} suffixes`).toBeGreaterThanOrEqual(5);
			}
		}
	});
});
