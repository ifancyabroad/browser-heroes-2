import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../test/createTestRunState";
import { applyDamage } from "./applyDamage";

describe("applyDamage", () => {
	it("does not reduce current HP below zero", () => {
		const combatant = createTestRunState().combat!.player;

		const result = applyDamage(combatant, {
			amount: combatant.currentHp + 100,
			affinity: "normal",
			damageType: "slashing",
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
});
