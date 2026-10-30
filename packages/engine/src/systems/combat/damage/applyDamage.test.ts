import { describe, expect, it } from "vitest";
import type { CombatantState } from "../../../schemas";
import { createTestCombat } from "../../../test/createTestCombat";
import type { DamageResult } from "./calculateDamage";
import { applyDamage } from "./applyDamage";

describe("applyDamage", () => {
	it("does not reduce current HP below zero", () => {
		const combatant = createTestCombat().player;

		const result = applyDamage(combatant, {
			amount: combatant.currentHp + 100,
			affinity: "normal",
			damageType: "slashing",
			damageClass: "physical",
			roll: {
				formula: "1d4",
				rolls: [4],
				rollTotal: 4,
				formulaModifier: 0,
				total: 4,
				critical: false,
			},
			abilityModifier: 0,
			modifiedBaseAmount: combatant.currentHp + 100,
		});

		expect(result.combatant.currentHp).toBe(0);
	});

	it("consumes shields before current HP", () => {
		const combatant: CombatantState = {
			...createTestCombat().player,
			activeEffects: [
				{
					id: "test-shield",
					type: "shield" as const,
					sourceCombatantId: "player",
					sourceSide: "player" as const,
					source: {
						type: "skill" as const,
						skillId: "armour_break" as const,
						sourceName: "Test Shield",
						sourceEffectKey: "shield",
					},
					duration: { unit: "turns", remaining: 2 },
					remainingAmount: 3,
				},
			],
		};

		const result = applyDamage(combatant, createDamageResult(5));

		expect(result.absorbedDamage).toBe(3);
		expect(result.hpDamage).toBe(2);
		expect(result.combatant.currentHp).toBe(combatant.currentHp - 2);
		expect(result.combatant.activeEffects).toEqual([]);
	});

	it("preserves a partially depleted shield when it absorbs all damage", () => {
		const combatant: CombatantState = {
			...createTestCombat().player,
			activeEffects: [
				{
					id: "test-shield",
					type: "shield" as const,
					sourceCombatantId: "player",
					sourceSide: "player" as const,
					source: {
						type: "skill" as const,
						skillId: "armour_break" as const,
						sourceName: "Test Shield",
						sourceEffectKey: "shield",
					},
					duration: { unit: "turns", remaining: 2 },
					remainingAmount: 5,
				},
			],
		};

		const result = applyDamage(combatant, createDamageResult(2));

		expect(result.absorbedDamage).toBe(2);
		expect(result.hpDamage).toBe(0);
		expect(result.combatant.currentHp).toBe(combatant.currentHp);
		expect(result.combatant.activeEffects[0]).toMatchObject({ remainingAmount: 3 });
	});
});

function createDamageResult(amount: number): DamageResult {
	return {
		amount,
		affinity: "normal" as const,
		damageType: "slashing" as const,
		damageClass: "physical",
		roll: {
			formula: "1d4" as const,
			rolls: [amount],
			rollTotal: amount,
			formulaModifier: 0,
			total: amount,
			critical: false,
		},
		abilityModifier: 0,
		modifiedBaseAmount: amount,
	};
}
