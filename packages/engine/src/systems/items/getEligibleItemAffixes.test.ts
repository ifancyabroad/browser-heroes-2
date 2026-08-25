import {
	ITEMAFFIXES_BY_ID,
	ITEMBASES_BY_ID,
	itemAffixRarities,
	itemAffixSchema,
	type ItemAffixRarity,
	type ItemBase,
} from "@app/content";
import { describe, expect, it } from "vitest";

import { getEligibleItemAffixes } from "./getEligibleItemAffixes";

function getAffixIds(base: ItemBase, rarity: ItemAffixRarity, position: "prefix" | "suffix") {
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

	it("matches any applicability rule while retaining AND semantics within each rule", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix")).toContain("precise");
		expect(getAffixIds(ITEMBASES_BY_ID.base_helmet, "rare", "prefix")).toContain("precise");
		expect(getAffixIds(ITEMBASES_BY_ID.base_boots, "rare", "prefix")).not.toContain("precise");

		expect(getAffixIds(ITEMBASES_BY_ID.base_fire_wand, "rare", "prefix")).toContain("potent");
		expect(getAffixIds(ITEMBASES_BY_ID.base_robe, "rare", "prefix")).toContain("potent");
		expect(getAffixIds(ITEMBASES_BY_ID.base_plate_armour, "rare", "prefix")).not.toContain(
			"potent",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix")).not.toContain(
			"potent",
		);

		expect(getAffixIds(ITEMBASES_BY_ID.base_mace, "rare", "suffix")).toContain("of_mending");
		expect(getAffixIds(ITEMBASES_BY_ID.base_robe, "rare", "suffix")).toContain("of_mending");
		expect(getAffixIds(ITEMBASES_BY_ID.base_shield, "rare", "suffix")).not.toContain(
			"of_mending",
		);
	});

	it("gives quarterstaves martial crushing affixes instead of magical staff affixes", () => {
		const quarterstaff = ITEMBASES_BY_ID.base_quarterstaff;

		expect(getAffixIds(quarterstaff, "uncommon", "prefix")).toEqual(
			expect.arrayContaining(["concussive", "forceful"]),
		);
		expect(getAffixIds(quarterstaff, "rare", "prefix")).toContain("defending");
		expect(getAffixIds(quarterstaff, "epic", "prefix")).toContain("stunning");

		expect(getAffixIds(quarterstaff, "uncommon", "prefix")).not.toContain("focused");
		expect(getAffixIds(quarterstaff, "rare", "prefix")).not.toContain("potent");
		expect(getAffixIds(quarterstaff, "epic", "prefix")).not.toContain("overwhelming");
		expect(getAffixIds(quarterstaff, "rare", "suffix")).not.toContain("of_mending");
		expect(getAffixIds(quarterstaff, "epic", "suffix")).not.toContain("of_restoration");
	});

	it("keeps mace, morningstar, and flail affix identities distinct", () => {
		const mace = ITEMBASES_BY_ID.base_mace;
		const morningstar = ITEMBASES_BY_ID.base_morningstar;
		const flail = ITEMBASES_BY_ID.base_flail;

		expect(getAffixIds(mace, "uncommon", "prefix")).toEqual(
			expect.arrayContaining(["concussive", "forceful"]),
		);
		expect(getAffixIds(mace, "rare", "prefix")).toEqual(
			expect.arrayContaining(["defending", "sundering"]),
		);
		expect(getAffixIds(mace, "rare", "suffix")).toContain("of_mending");
		expect(getAffixIds(mace, "epic", "prefix")).toContain("renewing");

		expect(getAffixIds(morningstar, "uncommon", "prefix")).toEqual(
			expect.arrayContaining(["barbed", "puncturing"]),
		);
		expect(getAffixIds(morningstar, "uncommon", "prefix")).not.toContain("concussive");
		expect(getAffixIds(morningstar, "rare", "prefix")).toContain("sundering");
		expect(getAffixIds(morningstar, "rare", "prefix")).not.toContain("defending");
		expect(getAffixIds(morningstar, "rare", "suffix")).not.toContain("of_mending");

		expect(getAffixIds(flail, "uncommon", "prefix")).toEqual(
			expect.arrayContaining(["concussive"]),
		);
		expect(getAffixIds(flail, "uncommon", "prefix")).not.toContain("forceful");
		expect(getAffixIds(flail, "rare", "prefix")).toEqual(
			expect.arrayContaining(["entangling", "sundering"]),
		);
		expect(getAffixIds(flail, "rare", "prefix")).not.toContain("defending");
		expect(getAffixIds(flail, "rare", "suffix")).not.toContain("of_mending");
	});

	it("distinguishes light, balanced, and heavy weapon archetypes", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_handaxe, "rare", "prefix")).not.toContain(
			"sundering",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_battleaxe, "rare", "prefix")).toContain(
			"sundering",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_club, "uncommon", "prefix")).not.toContain(
			"forceful",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_greatclub, "uncommon", "prefix")).toContain(
			"forceful",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_shortsword, "uncommon", "prefix")).toContain(
			"puncturing",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_shortsword, "uncommon", "prefix")).not.toContain(
			"sharp",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_greatsword, "rare", "prefix")).toContain(
			"sundering",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_greatsword, "rare", "prefix")).not.toContain(
			"defending",
		);
	});

	it("offers brutal only to heavy two-handed weapon families", () => {
		for (const base of [
			ITEMBASES_BY_ID.base_battleaxe,
			ITEMBASES_BY_ID.base_greatclub,
			ITEMBASES_BY_ID.base_greatsword,
			ITEMBASES_BY_ID.base_warhammer,
		]) {
			expect(getAffixIds(base, "epic", "prefix")).toContain("brutal");
		}

		expect(getAffixIds(ITEMBASES_BY_ID.base_handaxe, "epic", "prefix")).not.toContain("brutal");
		expect(getAffixIds(ITEMBASES_BY_ID.base_hammer, "epic", "prefix")).not.toContain("brutal");
	});

	it("rejects attack riders when any applicability alternative permits armour", () => {
		expect(
			itemAffixSchema.safeParse({
				id: "invalid_mixed_rider",
				name: "Invalid Mixed Rider",
				position: "prefix",
				rarity: "rare",
				appliesTo: [
					{ itemTypes: ["weapon"] },
					{ itemTypes: ["armour"], armourSlots: ["gloves"] },
				],
				attackRiders: [
					{
						timing: "onHit",
						effects: [
							{ type: "damage", target: "enemy", damageType: "fire", dice: "1d4" },
						],
					},
				],
			}).success,
		).toBe(false);
	});

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

	it("provides simple on-hit rider progressions where no damage-over-time family exists", () => {
		const progressions = [
			["frosted", "icy", "permafrost", "cold"],
			["concussive", "pulverising", "earthshaking", "crushing"],
			["storming", "electrified", "tempestuous", "lightning"],
			["necrotic", "funereal", "deathbound", "necrotic"],
			["puncturing", "impaling", "transfixing", "piercing"],
			["radiant", "sacred", "dawnbound", "radiant"],
			["rending", "serrated", "severing", "slashing"],
		] as const;

		for (const [uncommonId, rareId, epicId, damageType] of progressions) {
			for (const [id, rarity, dice] of [
				[uncommonId, "uncommon", "1d4"],
				[rareId, "rare", "1d6"],
				[epicId, "epic", "1d8"],
			] as const) {
				expect(ITEMAFFIXES_BY_ID[id]).toMatchObject({ rarity });
				expect(ITEMAFFIXES_BY_ID[id].attackRiders).toContainEqual(
					expect.objectContaining({
						timing: "onHit",
						effects: [expect.objectContaining({ type: "damage", damageType, dice })],
					}),
				);
			}
		}
	});

	it("uses a non-stacking critical progression across affix positions", () => {
		expect(ITEMAFFIXES_BY_ID.of_impact).toMatchObject({
			rarity: "uncommon",
			position: "suffix",
			modifiers: [{ stat: "criticalDiceMultiplierBonus", value: 1 }],
		});
		expect(ITEMAFFIXES_BY_ID.of_devastation).toMatchObject({
			rarity: "rare",
			position: "suffix",
			modifiers: [{ stat: "criticalDiceMultiplierBonus", value: 2 }],
		});
		expect(ITEMAFFIXES_BY_ID.brutal).toMatchObject({
			rarity: "epic",
			position: "prefix",
			modifiers: [{ stat: "criticalDiceMultiplierBonus", value: 4 }],
		});
	});

	it("provides epic immunity counterparts to elemental resistances", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_boots, "epic", "suffix")).toEqual(
			expect.arrayContaining(["of_the_alkaline", "of_the_unfrozen", "of_the_stormless"]),
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_gauntlets, "epic", "suffix")).toContain(
			"of_the_alkaline",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_gauntlets, "epic", "suffix")).not.toContain(
			"of_the_unfrozen",
		);
	});

	it("matches physical affixes to the weapon's base damage type", () => {
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "uncommon", "prefix")).toContain(
			"sharp",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "uncommon", "prefix")).not.toContain(
			"sharp",
		);
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "uncommon", "prefix")).toContain("barbed");
		expect(getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "prefix")).toContain("serrated");
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "rare", "prefix")).not.toContain("serrated");
		expect(getAffixIds(ITEMBASES_BY_ID.base_spear, "epic", "prefix")).toContain("transfixing");
	});

	it("matches damage class and attack range affixes to weapon bases", () => {
		const longswordAffixes = getAffixIds(ITEMBASES_BY_ID.base_longsword, "rare", "suffix");
		expect(longswordAffixes).toEqual(expect.arrayContaining(["of_force", "of_close_quarters"]));
		expect(longswordAffixes).not.toEqual(
			expect.arrayContaining(["of_sorcery", "of_marksmanship"]),
		);

		const wandAffixes = getAffixIds(ITEMBASES_BY_ID.base_fire_wand, "rare", "suffix");
		expect(wandAffixes).toEqual(expect.arrayContaining(["of_sorcery", "of_marksmanship"]));
		expect(wandAffixes).not.toEqual(expect.arrayContaining(["of_force", "of_close_quarters"]));

		const staffAffixes = getAffixIds(ITEMBASES_BY_ID.base_fire_staff, "rare", "suffix");
		expect(staffAffixes).toEqual(expect.arrayContaining(["of_sorcery", "of_close_quarters"]));
		expect(staffAffixes).not.toEqual(expect.arrayContaining(["of_force", "of_marksmanship"]));

		const armourAffixes = getAffixIds(ITEMBASES_BY_ID.base_robe, "rare", "suffix");
		expect(armourAffixes).not.toEqual(
			expect.arrayContaining([
				"of_force",
				"of_sorcery",
				"of_close_quarters",
				"of_marksmanship",
			]),
		);
	});

	it("combines weapon family and damage type restrictions", () => {
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
