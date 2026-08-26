import { describe, expect, it } from "vitest";
import { catalogByKey } from "./catalog";
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

	it("links system ghost build references in both directions", () => {
		const ghost = catalogByKey["system-ghosts"].entries.find(
			(entry) => entry.id === "iron_vigil",
		)!;
		const outgoing = getOutgoingReferences("system-ghosts", ghost);

		expect(outgoing).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ category: "classes", id: "warrior" }),
				expect.objectContaining({ category: "skills", id: "double_strike" }),
				expect.objectContaining({ category: "feats", id: "juggernaut" }),
				expect.objectContaining({ category: "item-bases", id: "base_longsword" }),
			]),
		);
		expect(getIncomingReferences("classes", "warrior")).toContainEqual(
			expect.objectContaining({ category: "system-ghosts", id: ghost.id }),
		);
	});
});
