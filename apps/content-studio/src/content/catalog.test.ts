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

	it("projects skill kind and category for browsing and filtering", () => {
		const catalog = catalogByKey.skills;
		const skill = catalog.entries[0];

		expect(catalog.columns.map((column) => column.key)).toContain("kind");
		expect(catalog.filters.map((filter) => filter.key)).toContain("kind");
		expect(skill.facets.kind).toEqual([skill.cells.kind]);
		expect(skill.facets.category).toEqual([skill.cells.category]);
		expect(skill.searchText).toContain(String(skill.cells.kind).toLocaleLowerCase());
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
});
