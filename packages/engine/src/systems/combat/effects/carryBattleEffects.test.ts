import { describe, expect, it } from "vitest";

import type { ActiveCombatEffect } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { carryBattleEffects } from "./carryBattleEffects";

describe("carryBattleEffects", () => {
	it("preserves effect-specific state and reconciles temporary maximum HP", () => {
		const previousPlayer = createTestRunState().combat!.player;
		const nextPlayer = {
			...previousPlayer,
			id: "next-player",
			activeEffects: [],
		};
		previousPlayer.activeEffects = [
			createEffect({
				id: "shield",
				type: "shield",
				remainingAmount: 7,
			}),
			createEffect({
				id: "roll",
				type: "modifyRoll",
				roll: "attack",
				mode: "advantage",
				remainingCharges: 2,
			}),
			createEffect({
				id: "maximum-hp",
				type: "modifyStat",
				stat: "maxHpBonus",
				value: 5,
			}),
		];

		const result = carryBattleEffects(previousPlayer, nextPlayer);

		expect(result.activeEffects).toEqual([
			expect.objectContaining({
				id: "shield",
				remainingAmount: 7,
				duration: { unit: "battles", remaining: 2 },
			}),
			expect.objectContaining({
				id: "roll",
				remainingCharges: 2,
				duration: { unit: "battles", remaining: 2 },
			}),
			expect.objectContaining({
				id: "maximum-hp",
				duration: { unit: "battles", remaining: 2 },
			}),
		]);
		expect(result.maxHp).toBe(nextPlayer.maxHp + 5);
		expect(result.currentHp).toBe(nextPlayer.currentHp + 5);
	});
});

function createEffect(
	effect:
		| Pick<Extract<ActiveCombatEffect, { type: "shield" }>, "id" | "type" | "remainingAmount">
		| Pick<
				Extract<ActiveCombatEffect, { type: "modifyRoll" }>,
				"id" | "type" | "roll" | "mode" | "remainingCharges"
		  >
		| Pick<
				Extract<ActiveCombatEffect, { type: "modifyStat" }>,
				"id" | "type" | "stat" | "value"
		  >,
): ActiveCombatEffect {
	return {
		...effect,
		sourceCombatantId: "previous-player",
		sourceSide: "player",
		source: {
			type: "skill",
			skillId: "armour",
			sourceName: "Test Effect",
			sourceEffectKey: effect.id,
		},
		duration: { unit: "battles", remaining: 3 },
	} as ActiveCombatEffect;
}
