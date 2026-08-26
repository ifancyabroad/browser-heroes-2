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
		const sample = catalog.entries[0]!;
		const pool = sample.facets.pool[0]!;
		const query = readCatalogQuery(
			catalog,
			new URLSearchParams(`q=${sample.id}&pool=${pool}&sort=id&dir=desc`),
		);
		const results = applyCatalogQuery(catalog, query);
		expect(results.length).toBeGreaterThan(0);
		expect(
			results.every(
				(entry) => entry.searchText.includes(sample.id) && entry.facets.pool.includes(pool),
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
		const skill = catalogByKey.skills.entries.find((entry) =>
			hasNestedProperty(entry.definition, "attackRiders"),
		)!;
		const effectTypes = collectStringProperties(skill.definition, "type");
		const damageTypes = collectStringProperties(skill.definition, "damageType");

		expect(skill.facets.effect).toEqual(effectTypes);
		expect(skill.facets.damageType).toEqual(damageTypes);
		expect(skill.cells.damageTypes).toBe(damageTypes.join(", "));
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
		const feat = catalog.entries.find((entry) => entry.facets.timing.length > 0)!;

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
		const affix = catalog.entries.find(
			(entry) =>
				"appliesTo" in entry.definition &&
				entry.definition.appliesTo.some((rule) => rule.damageTypes?.length),
		)!;
		if (!("appliesTo" in affix.definition)) {
			throw new Error("Expected an affix definition");
		}
		const damageTypes = [
			...new Set(affix.definition.appliesTo.flatMap((rule) => rule.damageTypes ?? [])),
		].sort();

		expect(affix.cells.appliesTo).not.toBe("");
		expect(affix.facets.appliesTo).toEqual(expect.arrayContaining(damageTypes));
		expect(affix.facets.damageType).toEqual(damageTypes);
		expect(catalog.filters.map((filter) => filter.key)).toContain("damageType");
	});

	it("projects roll types and modes from nested skill effects", () => {
		const catalog = catalogByKey.skills;
		const skill = catalog.entries.find(
			(entry) =>
				collectStringProperties(entry.definition, "roll").length > 0 &&
				collectStringProperties(entry.definition, "mode").length > 0,
		)!;
		const rollTypes = collectStringProperties(skill.definition, "roll");
		const rollModes = collectStringProperties(skill.definition, "mode");

		expect(skill.facets.rollType).toEqual(rollTypes);
		expect(skill.facets.rollMode).toEqual(rollModes);
		expect(skill.cells.rollTypes).toBe(rollTypes.join(", "));
		expect(skill.cells.rollModes).toBe(rollModes.join(", "));
		expect(catalog.filters.map((filter) => filter.key)).toEqual(
			expect.arrayContaining(["rollType", "rollMode"]),
		);
	});

	it("projects duration summaries and units from nested effects", () => {
		const skills = catalogByKey.skills;
		const skill = skills.entries.find((entry) => entry.facets.durationUnit.length > 0)!;
		const durationSummary = String(skill.cells.durations);

		expect(durationSummary).not.toBe("");
		expect(skill.facets.durationUnit.length).toBeGreaterThan(0);
		expect(skill.searchText).toContain(durationSummary.toLocaleLowerCase());
		expect(skills.filters.map((filter) => filter.key)).toContain("durationUnit");
	});
});

function hasNestedProperty(value: unknown, key: string): boolean {
	if (Array.isArray(value)) {
		return value.some((item) => hasNestedProperty(item, key));
	}
	if (typeof value !== "object" || value === null) {
		return false;
	}
	return Object.entries(value).some(
		([property, child]) => property === key || hasNestedProperty(child, key),
	);
}

function collectStringProperties(value: unknown, key: string): string[] {
	if (Array.isArray(value)) {
		return [...new Set(value.flatMap((item) => collectStringProperties(item, key)))].sort();
	}
	if (typeof value !== "object" || value === null) {
		return [];
	}
	return [
		...new Set(
			Object.entries(value).flatMap(([property, child]) => [
				...(property === key && typeof child === "string" ? [child] : []),
				...collectStringProperties(child, key),
			]),
		),
	].sort();
}
