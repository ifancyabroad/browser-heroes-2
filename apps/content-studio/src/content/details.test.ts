import { describe, expect, it } from "vitest";
import { catalogByKey, catalogs } from "./catalog";
import { getDetailPresentation } from "./details";

const entry = (category: keyof typeof catalogByKey, id: string) =>
	catalogByKey[category].entries.find((entry) => entry.id === id)!;

describe("category detail presentations", () => {
	it("separates enemy identity, combat facts, attributes, attack and skills", () => {
		const enemy = entry("enemies", "nature_elemental");
		const view = getDetailPresentation("enemies", enemy);
		expect(view.summary.map((fact) => fact.label)).toEqual(["Zone", "Threat"]);
		expect(view.sections.map((section) => section.id)).toEqual([
			"combat-profile",
			"basic-attack",
			"skills",
			"damage-affinities",
		]);
		expect(view.additional.map(([key]) => key)).toEqual(
			expect.arrayContaining(["shortName", "encounterWeight"]),
		);
		expect(view.additional.map(([key]) => key)).not.toContain("combat");
		const profile = view.sections.find((section) => section.kind === "profile")!;
		if (
			profile.kind !== "profile" ||
			!("attributes" in enemy.definition) ||
			!("armourClass" in enemy.definition.combat)
		) {
			throw new Error("Expected an enemy profile");
		}
		expect(profile.attributes).toEqual(enemy.definition.attributes);
		expect(profile.facts).toContainEqual({
			label: "Armour class",
			value: enemy.definition.combat.armourClass,
		});
		expect(profile.facts).toContainEqual({
			label: "Saving throw proficiencies",
			value: ["Constitution", "Wisdom"],
		});
	});

	it("preserves class proficiencies in the profile facts", () => {
		const view = getDetailPresentation("classes", entry("classes", "warrior"));
		const profile = view.sections.find((section) => section.kind === "profile")!;
		if (profile.kind !== "profile") {
			throw new Error("Expected a class profile");
		}
		expect(profile.facts.map((fact) => fact.label)).toEqual([
			"Armour",
			"Saving throws",
			"Weapons",
		]);
		expect(
			profile.facts.every((fact) => Array.isArray(fact.value) && fact.value.length > 0),
		).toBe(true);
	});

	it("keeps a skill's useful metadata together and omits empty tags", () => {
		const view = getDetailPresentation("skills", entry("skills", "ravage"));
		expect(view.summary).toEqual([
			{ label: "Kind", value: "Weapon Attack" },
			{ label: "Pool", value: "Common" },
			{ label: "Rarity", value: "Rare" },
			{ label: "Maximum uses", value: 3 },
		]);
		expect(view.additional).toHaveLength(0);
		expect(view.sections.map((section) => section.id)).toEqual(["definition-effects"]);
	});

	it("describes skills without a usage limit explicitly", () => {
		const skill = catalogByKey.skills.entries.find(
			(entry) => "pool" in entry.definition && entry.definition.maxUses === undefined,
		)!;
		expect(getDetailPresentation("skills", skill).summary).toContainEqual({
			label: "Maximum uses",
			value: "Unlimited",
		});
	});

	it("preserves unfamiliar fields in additional properties", () => {
		const skill = entry("skills", "ravage");
		const definition = Object.assign({}, skill.definition, {
			futureNote: "Keep this",
			reviewFlag: false,
			reviewCount: 0,
		});
		const view = getDetailPresentation("skills", { ...skill, definition });
		expect(view.additional).toEqual(
			expect.arrayContaining([
				["futureNote", "Keep this"],
				["reviewFlag", false],
				["reviewCount", 0],
			]),
		);
	});

	it("keeps ghost gear recipes linked to their bases with slots and rarity", () => {
		const ghost = entry("system-ghosts", "last_sentinel");
		const view = getDetailPresentation("system-ghosts", ghost);
		const equipment = view.sections.find((section) => section.id === "equipment")!;
		expect(equipment.kind).toBe("links");
		if (equipment.kind !== "links") {
			throw new Error("Expected gear links");
		}
		expect(equipment.links.length).toBeGreaterThan(0);
		for (const link of equipment.links) {
			expect(link.category).toBe("item-bases");
			expect(link.label).toBeTruthy();
			expect(link.detail).toBeTruthy();
		}
	});

	it.each(catalogs)(
		"gives every $label entry a complete presentation without empty sections",
		(catalog) => {
			for (const entry of catalog.entries) {
				const view = getDetailPresentation(catalog.key, entry);
				expect(new Set(view.sections.map((section) => section.id)).size).toBe(
					view.sections.length,
				);
				for (const fact of view.summary) {
					expect(fact.value).not.toBeUndefined();
				}
				for (const section of view.sections) {
					if (section.kind === "links") {
						expect(section.links.length).toBeGreaterThan(0);
					}
					if (section.kind === "facts") {
						expect(section.facts.length).toBeGreaterThan(0);
					}
					if (section.kind === "mechanics") {
						expect(section.value).not.toEqual([]);
					}
				}
				for (const [key] of view.additional) {
					expect(["tags", "order", "weight", "shortName", "encounterWeight"]).toContain(
						key,
					);
				}
			}
		},
	);
});
