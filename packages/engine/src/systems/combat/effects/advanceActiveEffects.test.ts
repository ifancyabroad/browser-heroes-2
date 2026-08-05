import { describe, expect, it } from "vitest";
import type { ActiveCombatEffect } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { advanceActiveEffects } from "./advanceActiveEffects";

describe("advanceActiveEffects", () => {
	it("decrements effects that existed at the start of the turn", () => {
		const effect = createStatusEffect("existing", 2);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [effect],
		};

		const result = advanceActiveEffects(combatant, new Set([effect.id]));

		expect(result.combatant.activeEffects).toEqual([
			expect.objectContaining({ id: effect.id, duration: { unit: "turns", remaining: 1 } }),
		]);
		expect(result.expiredEffects).toEqual([]);
	});

	it("expires effects after their final turn", () => {
		const effect = createStatusEffect("expiring", 1);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [effect],
		};

		const result = advanceActiveEffects(combatant, new Set([effect.id]));

		expect(result.combatant.activeEffects).toEqual([]);
		expect(result.expiredEffects).toEqual([effect]);
	});

	it("does not decrement an effect applied during the current turn", () => {
		const effect = createStatusEffect("new", 2);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [effect],
		};

		const result = advanceActiveEffects(combatant, new Set());

		expect(result.combatant.activeEffects).toEqual([effect]);
		expect(result.expiredEffects).toEqual([]);
	});

	it("does not decrement battle-duration effects during a turn", () => {
		const effect = {
			...createStatusEffect("battle-effect", 2),
			duration: { unit: "battles" as const, remaining: 2 },
		};
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [effect],
		};

		const result = advanceActiveEffects(combatant, new Set([effect.id]));

		expect(result.combatant.activeEffects).toEqual([effect]);
		expect(result.expiredEffects).toEqual([]);
	});
});

function createStatusEffect(id: string, remaining: number): ActiveCombatEffect {
	return {
		id,
		type: "status",
		sourceCombatantId: "enemy",
		sourceSide: "enemy",
		source: {
			type: "skill",
			skillId: "armour_break",
			sourceName: "Test Effect",
			sourceEffectKey: id,
		},
		duration: { unit: "turns", remaining },
		statusId: "stunned",
	};
}
