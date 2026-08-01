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
});
