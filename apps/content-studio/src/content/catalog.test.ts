import { describe, expect, it } from "vitest";
import { catalogByKey, catalogs } from "./catalog";
import { applyCatalogQuery, readCatalogQuery, writeCatalogQuery } from "./query";

describe("content catalogs", () => {
	it("projects every generated category into searchable table entries", () => {
		expect(catalogs.map((catalog) => catalog.key)).toEqual([
			"enemies",
			"skills",
			"feats",
			"classes",
			"item-bases",
			"affixes",
			"items",
			"achievements",
		]);
		for (const catalog of catalogs) {
			expect(catalog.entries.length).toBeGreaterThan(0);
			expect(
				catalog.entries.every((entry) =>
					entry.searchText.includes(entry.id.toLocaleLowerCase()),
				),
			).toBe(true);
			expect(
				catalog.columns.every((column) =>
					catalog.entries.every((entry) => column.key in entry.cells),
				),
			).toBe(true);
		}
	});

	it("searches, filters, and sorts category projections", () => {
		const catalog = catalogByKey.skills;
		const query = readCatalogQuery(
			catalog,
			new URLSearchParams("q=fire&pool=warlock&sort=id&dir=desc"),
		);
		const results = applyCatalogQuery(catalog, query);
		expect(results.length).toBeGreaterThan(0);
		expect(
			results.every(
				(entry) =>
					entry.searchText.includes("fire") && entry.facets.pool.includes("warlock"),
			),
		).toBe(true);
		expect(results.map((entry) => entry.id)).toEqual(
			[...results.map((entry) => entry.id)].sort().reverse(),
		);
	});

	it("round trips bookmarkable view state", () => {
		const catalog = catalogByKey.enemies;
		const query = readCatalogQuery(
			catalog,
			new URLSearchParams("q=rat&zone=dungeon&sort=threat&dir=desc&page=2&view=images"),
		);
		expect(readCatalogQuery(catalog, writeCatalogQuery(query))).toEqual(query);
	});

	it("includes nested attack-rider metadata in skill projections", () => {
		const acidBite = catalogByKey.skills.entries.find((entry) => entry.id === "acid_bite");
		expect(acidBite?.facets.effect).toEqual(["attackDamage", "damage"]);
		expect(acidBite?.facets.damageType).toEqual(["acid"]);
		expect(acidBite?.cells.damageTypes).toBe("acid");
	});

	it("projects skill kind, category, and rarity for browsing and filtering", () => {
		const catalog = catalogByKey.skills;
		const skill = catalog.entries[0];

		expect(catalog.columns.map((column) => column.key)).toContain("kind");
		expect(catalog.filters.map((filter) => filter.key)).toContain("kind");
		expect(catalog.columns.map((column) => column.key)).toContain("rarity");
		expect(catalog.filters.map((filter) => filter.key)).toContain("rarity");
		expect(skill.facets.kind).toEqual([skill.cells.kind]);
		expect(skill.facets.category).toEqual([skill.cells.category]);
		expect(skill.facets.rarity).toEqual([skill.cells.rarity]);
		expect(skill.searchText).toContain(String(skill.cells.kind).toLocaleLowerCase());
		expect(skill.searchText).toContain(String(skill.cells.rarity).toLocaleLowerCase());
	});

	it("projects feat kind, category, and attack riders", () => {
		const catalog = catalogByKey.feats;
		const feat = catalog.entries.find((entry) => entry.id === "blood_drinker")!;

		expect(catalog.columns.map((column) => column.key)).toEqual(
			expect.arrayContaining(["kind", "category", "riders"]),
		);
		expect(catalog.filters.map((filter) => filter.key)).toEqual(
			expect.arrayContaining(["kind", "category", "timing"]),
		);
		expect(feat.facets.kind).toEqual([feat.cells.kind]);
		expect(feat.facets.category).toEqual([feat.cells.category]);
		expect(feat.cells.riders).not.toBe("—");
		expect(feat.facets.timing).not.toHaveLength(0);
	});

	it("projects grouped affix applicability and damage type rules", () => {
		const catalog = catalogByKey.affixes;
		const barbed = catalog.entries.find((entry) => entry.id === "barbed")!;

		expect(barbed.cells.appliesTo).toBe(
			"type: weapon, weapon: bow/crossbow/spear, damage: piercing",
		);
		expect(barbed.facets.appliesTo).toEqual(
			expect.arrayContaining(["weapon", "bow", "crossbow", "spear", "piercing"]),
		);
		expect(barbed.facets.damageType).toEqual(["piercing"]);
		expect(catalog.filters.map((filter) => filter.key)).toContain("damageType");
	});

	it("projects roll types and modes from nested skill effects", () => {
		const catalog = catalogByKey.skills;
		const acrobaticStrike = catalog.entries.find((entry) => entry.id === "acrobatic_strike")!;
		const bless = catalog.entries.find((entry) => entry.id === "bless")!;

		expect(acrobaticStrike.facets.rollMode).toEqual(["automaticCritical", "disadvantage"]);
		expect(acrobaticStrike.cells.rollModes).toBe("automaticCritical, disadvantage");
		expect(bless.facets.rollType).toEqual(["savingThrow"]);
		expect(bless.facets.rollMode).toEqual(["advantage"]);
		expect(bless.cells.rollTypes).toBe("savingThrow");
		expect(catalog.filters.map((filter) => filter.key)).toEqual(
			expect.arrayContaining(["rollType", "rollMode"]),
		);
	});

	it("projects duration summaries and units from nested effects", () => {
		const skills = catalogByKey.skills;
		const armour = skills.entries.find((entry) => entry.id === "armour")!;
		const feats = catalogByKey.feats;
		const guardedAssault = feats.entries.find((entry) => entry.id === "guarded_assault")!;

		expect(armour.cells.durations).toBe("3 battles");
		expect(armour.facets.durationUnit).toEqual(["battles"]);
		expect(armour.searchText).toContain("3 battles");
		expect(skills.filters.map((filter) => filter.key)).toContain("durationUnit");
		expect(guardedAssault.cells.riders).toContain("2 turns");
		expect(guardedAssault.searchText).toContain("2 turns");
	});
});
