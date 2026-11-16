import { describe, expect, it } from "vitest";
import type { AdminActivityEntry } from "@app/shared";
import { activityGroup, describeActivity } from "./activityPresentation";
import { mergeActivity } from "./mergeActivity";

function entry(id: string): AdminActivityEntry {
	return {
		id,
		createdAt: "2026-11-16T12:00:00Z",
		runId: "run",
		heroName: "Mira",
		classId: "mage",
		mode: "normal",
		displayName: null,
		event: { type: "hero_created" },
	};
}

describe("activity presentation", () => {
	it("deduplicates races, orders timestamp ties and bounds the live buffer", () => {
		expect(
			mergeActivity([entry("b"), entry("a")], [entry("a")]).map((value) => value.id),
		).toEqual(["a", "b"]);
		const values = Array.from({ length: 510 }, (_, index) =>
			entry(String(index).padStart(3, "0")),
		);
		const result = mergeActivity(values);
		expect(result).toHaveLength(500);
		expect(result[0].id).toBe("010");
	});
	it("groups purchases independently of legendary highlighting", () => {
		const purchase = {
			type: "item_purchased" as const,
			rarity: "legendary" as const,
			itemName: "Treasure",
			price: 42,
		};
		expect(activityGroup(purchase)).toBe("Purchases");
		expect(describeActivity(purchase)).toEqual({
			text: "bought Treasure (legendary) for 42 gold",
			tone: "activity-highlight",
		});
		expect(describeActivity({ type: "level_up", level: 2, selection: null }).text).toBe(
			"reached level 2",
		);
	});
});
