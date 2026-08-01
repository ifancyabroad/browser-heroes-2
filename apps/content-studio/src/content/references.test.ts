import { describe, expect, it } from "vitest";
import { catalogByKey } from "./catalog";
import { getIncomingReferences, getOutgoingReferences } from "./references";

describe("content references", () => {
	it("links enemy skills and supplies the reverse reference", () => {
		const wretch = catalogByKey.enemies.entries.find((entry) => entry.id === "wretch")!;
		const outgoing = getOutgoingReferences("enemies", wretch);
		expect(outgoing).toContainEqual(
			expect.objectContaining({ category: "skills", id: "leap_attack" }),
		);
		expect(getIncomingReferences("skills", "leap_attack")).toContainEqual(
			expect.objectContaining({ category: "enemies", id: "wretch" }),
		);
	});

	it("returns an empty list for definitions with no authored references", () => {
		const achievement = catalogByKey.achievements.entries[0]!;
		expect(getOutgoingReferences("achievements", achievement)).toEqual([]);
	});
});
