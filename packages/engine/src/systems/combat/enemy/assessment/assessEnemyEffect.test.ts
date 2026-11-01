import type { Effect } from "@app/content";
import { describe, expect, it } from "vitest";

import { createTestCombat } from "../../../../test/createTestCombat";
import { assessEnemyEffect } from "./assessEnemyEffect";

function assess(effect: Effect) {
	const { enemy, player } = createTestCombat();
	return assessEnemyEffect({
		effect,
		enemy,
		player,
		source: { type: "skill", skillId: "stand_ground" },
		sourceEffectKey: "effect:0",
	});
}

describe("enemy effect assessment", () => {
	it("preserves legacy self-status eligibility without setup preference", () => {
		expect(
			assess({
				type: "applyStatus",
				target: "self",
				statusId: "stunned",
				duration: { unit: "turns", value: 2 },
			}),
		).toBe("standard");
	});

	it.each(["self", "enemy"] as const)(
		"distinguishes beneficial and harmful healing modifiers targeting %s",
		(target) => {
			const effect = {
				type: "modifyHealing" as const,
				target,
				duration: { unit: "turns" as const, value: 2 },
			};
			expect(assess({ ...effect, multiplier: target === "self" ? 2 : 0.5 })).toBe("setup");
			// Harmful and neutral modifiers remain eligible under existing rules.
			expect(assess({ ...effect, multiplier: target === "self" ? 0.5 : 2 })).toBe("standard");
			expect(assess({ ...effect, multiplier: 1 })).toBe("standard");
		},
	);

	it.each(["add", "multiply"] as const)(
		"distinguishes beneficial and harmful damage taken modifiers using %s",
		(operation) => {
			for (const target of ["self", "enemy"] as const) {
				const neutralValue = operation === "add" ? 0 : 1;
				const effect = {
					type: "modifyDamageTaken" as const,
					target,
					operation,
					duration: { unit: "turns" as const, value: 2 },
				};
				const beneficialValue = target === "self" ? neutralValue - 0.5 : neutralValue + 0.5;
				const harmfulValue = target === "self" ? neutralValue + 0.5 : neutralValue - 0.5;
				expect(assess({ ...effect, value: beneficialValue })).toBe("setup");
				expect(assess({ ...effect, value: harmfulValue })).toBe("standard");
				expect(assess({ ...effect, value: neutralValue })).toBe("standard");
			}
		},
	);
});
