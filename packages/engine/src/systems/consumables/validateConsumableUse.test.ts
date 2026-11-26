import { describe, expect, it, vi } from "vitest";
import { createTestCombat, createTestStatus } from "../../test/createTestCombat";
import { createTestRunState } from "../../test/createTestRunState";
import { validateConsumableUse } from "./validateConsumableUse";

vi.mock("@app/content", async (importOriginal) => {
	const content = await importOriginal<typeof import("@app/content")>();
	return {
		...content,
		CONSUMABLES_BY_ID: {
			...content.CONSUMABLES_BY_ID,
			healingPotion: {
				...content.CONSUMABLES_BY_ID.healingPotion,
				effects: [
					{ type: "heal", target: "self", percent: 0.25 },
					{
						type: "damage",
						target: "enemy",
						dice: "1d4",
						damageType: "fire",
						damageClass: "other",
						requiresAttackRoll: false,
					},
				],
			},
		},
	};
});

describe("validateConsumableUse", () => {
	it("checks every effect target and rejects an entire mixed potion without consuming it", () => {
		const { hero } = createTestRunState();
		const combat = createTestCombat();
		expect(validateConsumableUse(hero, "healingPotion", combat)).toEqual({ ok: true });
		combat.enemy.activeEffects.push(createTestStatus(combat.enemy, "invisible", 3));
		const before = structuredClone({ hero, combat });
		expect(validateConsumableUse(hero, "healingPotion", combat)).toEqual({
			ok: false,
			error: "TARGET_NOT_AVAILABLE",
		});
		expect({ hero, combat }).toEqual(before);
	});
});
