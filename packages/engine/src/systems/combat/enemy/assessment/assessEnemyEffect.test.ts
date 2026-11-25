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
	it.each([
		["haste", "self", "setup"],
		["haste", "enemy", "standard"],
		["stunned", "enemy", "setup"],
		["silenced", "enemy", "setup"],
	] as const)("assesses %s targeting %s as %s", (statusId, target, expected) => {
		expect(
			assess({
				type: "applyStatus",
				statusId,
				target,
				duration: { unit: "turns", value: 2 },
			}),
		).toBe(expected);
	});

	it("does not choose a Haste buff when the target is already hastened by another source", () => {
		const { enemy, player } = createTestCombat();
		enemy.activeEffects = [
			{
				id: "haste",
				type: "status",
				statusId: "haste",
				sourceCombatantId: enemy.id,
				sourceSide: "enemy",
				source: {
					type: "consumable",
					consumableId: "speedPotion",
					sourceName: "Potion of Speed",
					sourceEffectKey: "effect:0",
				},
				duration: { unit: "battles", remaining: 1 },
			},
		];
		expect(
			assessEnemyEffect({
				enemy,
				player,
				effect: {
					type: "applyStatus",
					target: "self",
					statusId: "haste",
					duration: { unit: "turns", value: 2 },
				},
				source: { type: "skill", skillId: "stand_ground" },
				sourceEffectKey: "effect:0",
			}),
		).toBeNull();
	});

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
