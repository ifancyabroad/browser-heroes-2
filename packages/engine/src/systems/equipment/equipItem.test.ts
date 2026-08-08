import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../test/createTestRunState";
import { equipItem } from "./equipItem";

describe("equipItem", () => {
	it("prevents restricted items from being equipped through direct item grants", () => {
		const hero = {
			...createTestRunState().hero,
			classId: "priest" as const,
		};

		expect(
			equipItem({
				hero,
				item: {
					instanceId: "restricted-item",
					type: "static",
					itemId: "archmages_robe",
				},
			}),
		).toEqual({ ok: false, error: "ITEM_NOT_EQUIPPABLE" });
	});
});
