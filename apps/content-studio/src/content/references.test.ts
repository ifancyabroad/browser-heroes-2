import { systemGhosts } from "@app/content";
import { describe, expect, it } from "vitest";
import { catalogByKey, type CategoryKey } from "./catalog";
import { getIncomingReferences, getOutgoingReferences } from "./references";

describe("content references", () => {
	it("links enemy skills and supplies the reverse reference", () => {
		const enemy = catalogByKey.enemies.entries.find(
			(entry) => "combat" in entry.definition && entry.definition.combat.skillIds.length > 0,
		)!;
		if (!("combat" in enemy.definition)) {
			throw new Error("Expected an enemy definition");
		}
		const skillId = enemy.definition.combat.skillIds[0]!;
		const outgoing = getOutgoingReferences("enemies", enemy);
		expect(outgoing).toContainEqual(
			expect.objectContaining({ category: "skills", id: skillId }),
		);
		expect(getIncomingReferences("skills", skillId)).toContainEqual(
			expect.objectContaining({ category: "enemies", id: enemy.id }),
		);
	});

	it("returns an empty list for definitions with no authored references", () => {
		const achievement = catalogByKey.achievements.entries[0]!;
		expect(getOutgoingReferences("achievements", achievement)).toEqual([]);
	});

	it.each(systemGhosts)("links system ghost $id references in both directions", (definition) => {
		const ghost = catalogByKey["system-ghosts"].entries.find(
			(entry) => entry.id === definition.id,
		)!;
		const outgoing = getOutgoingReferences("system-ghosts", ghost);
		const expected: { category: CategoryKey; id: string }[] = [
			{ category: "classes", id: definition.classId },
			...definition.additionalSkillIds.map((id) => ({ category: "skills" as const, id })),
			...definition.featIds.map((id) => ({ category: "feats" as const, id })),
			...Object.values(definition.equipment).map((recipe) => ({
				category: "item-bases" as const,
				id: recipe.baseId,
			})),
		];

		expect(outgoing).toHaveLength(expected.length);
		for (const target of expected) {
			expect(outgoing).toContainEqual(expect.objectContaining(target));
			expect(getIncomingReferences(target.category, target.id)).toContainEqual(
				expect.objectContaining({ category: "system-ghosts", id: ghost.id }),
			);
		}
	});
});
