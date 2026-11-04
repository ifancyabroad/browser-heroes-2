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

	it.each([
		["uncommon", "of_quickness"],
		["rare", "of_swiftness"],
		["epic", "of_alacrity"],
	] as const)(
		"keeps the %s Initiative suffix available on every equipment base",
		(rarity, affixId) => {
			for (const base of Object.values(ITEMBASES_BY_ID)) {
				expect(getAffixIds(base, rarity, "suffix")).toContain(affixId);
			}
		},
	);

	it.each([
		[
			"brawny",
			"titanforged",
			["base_battleaxe", "base_greatclub", "base_greatsword", "base_warhammer"],
		],
		["hawkeyed", "eagle_eyed", ["base_longbow", "base_crossbow"]],
		["deft", "dexterous", ["base_dagger", "base_shortsword"]],
		[
			"arcane",
			"archonic",
			[
				"base_fire_staff",
				"base_fire_wand",
				"base_cold_staff",
				"base_cold_wand",
				"base_lightning_staff",
				"base_lightning_wand",
			],
		],
		[
			"mystic",
			"transcendent",
			[
				"base_radiant_staff",
				"base_radiant_wand",
				"base_necrotic_staff",
				"base_necrotic_wand",
			],
		],
	] as const)(
		"limits %s and its epic variant to their thematic weapons",
		(rareId, epicId, expectedBases) => {
			for (const [rarity, affixId] of [
				["rare", rareId],
				["epic", epicId],
			] as const) {
				const eligibleBases = Object.values(ITEMBASES_BY_ID)
					.filter((base) => getAffixIds(base, rarity, "prefix").includes(affixId))
					.map((base) => base.id);
				expect(eligibleBases.sort()).toEqual([...expectedBases].sort());
			}
		},
	);

	it.each([
		["stalwart", "indomitable"],
		["dashing", "debonair"],
		["studious", "erudite"],
		["inspiring", "exalted"],
	])("keeps %s and its epic variant available on every equipment base", (rareId, epicId) => {
		for (const base of Object.values(ITEMBASES_BY_ID)) {
			expect(getAffixIds(base, "rare", "prefix")).toContain(rareId);
			expect(getAffixIds(base, "epic", "prefix")).toContain(epicId);
		}
	});

	it("keeps combined AC exclusive to epic body armour and shields", () => {
		for (const base of Object.values(ITEMBASES_BY_ID)) {
			const eligible =
				base.type === "armour" && (base.slot === "body" || base.slot === "shield");
			expect(getAffixIds(base, "epic", "suffix").includes("of_sanctuary")).toBe(eligible);
			expect(getAffixIds(base, "rare", "suffix")).not.toContain("of_sanctuary");
		}
	});

	it("uses shared accuracy and save DC slots for Versatile rather than their union", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_fire_wand, "rare", "prefix")).toContain(
			"versatile",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_ring, "rare", "prefix")).toContain("versatile");
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix")).not.toContain(
			"versatile",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_amulet, "rare", "prefix")).not.toContain(
			"versatile",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_robe, "rare", "prefix")).not.toContain("versatile");
	});
});
