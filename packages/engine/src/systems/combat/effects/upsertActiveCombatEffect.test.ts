import { describe, expect, it } from "vitest";
import type { ActiveCombatEffect } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { upsertActiveCombatEffect } from "./upsertActiveCombatEffect";

describe("upsertActiveCombatEffect", () => {
	it("adds an effect from a new source without mutating the combatant", () => {
		const combatant = createTestRunState().combat!.player;
		const original = structuredClone(combatant);
		const effect = createModifierEffect("new-effect", "new-source", 2, 1);

		const result = upsertActiveCombatEffect(combatant, effect);

		expect(result.activeEffects).toEqual([effect]);
		expect(combatant).toEqual(original);
	});

	it("replaces an effect from the same source while preserving its stable ID", () => {
		const existing = createModifierEffect("stable-id", "same-source", 1, 1);
		const replacement = createModifierEffect("replacement-id", "same-source", 3, 2);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};

		const result = upsertActiveCombatEffect(combatant, replacement);

		expect(result.activeEffects).toEqual([
			expect.objectContaining({
				id: "stable-id",
				remainingTurns: 3,
				value: 2,
			}),
		]);
		expect(result.activeEffects).toHaveLength(1);
	});
});

function createModifierEffect(
	id: string,
	sourceEffectKey: string,
	remainingTurns: number,
	value: number,
): ActiveCombatEffect {
	return {
		id,
		type: "modifyStat",
		sourceCombatantId: "player",
		source: {
			type: "skill",
			skillId: "armour_break",
			sourceName: "Test Modifier",
			sourceEffectKey,
		},
		remainingTurns,
		stat: "armourClass",
		value,
	};
}
