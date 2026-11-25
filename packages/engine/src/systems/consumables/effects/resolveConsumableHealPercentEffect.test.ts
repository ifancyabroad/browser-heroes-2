import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../../test/createTestCombat";
import { resolveConsumableHealPercentEffect } from "./resolveConsumableHealPercentEffect";

const healingEffect = { type: "healPercent", target: "self", percent: 0.5 } as const;
describe("resolveConsumableHealPercentEffect", () => {
	it("resolves percentage healing with the existing rounding and healing modifiers", () => {
		const combat = createTestCombat();
		combat.player.maxHp = 101;
		combat.player.currentHp = 10;
		combat.player.activeEffects.push({
			id: "healing-boost",
			type: "modifyHealing",
			multiplier: 1.5,
			sourceCombatantId: combat.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Boost",
				sourceEffectKey: "healing",
			},
			duration: { unit: "turns", remaining: 2 },
		});
		const result = resolveConsumableHealPercentEffect(combat, healingEffect, {
			value: 0,
		});
		expect(result.value.outcomes).toEqual([
			{
				type: "healing",
				targetId: combat.player.id,
				targetName: combat.player.name,
				amount: 76,
			},
		]);
		expect(result.value.combat.player.currentHp).toBe(86);
		expect(result.rngState).toEqual({ value: 0 });
	});
});
