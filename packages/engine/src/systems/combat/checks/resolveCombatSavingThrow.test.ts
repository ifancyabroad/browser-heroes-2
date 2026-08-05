import { describe, expect, it } from "vitest";

import type { CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveCombatSavingThrow } from "./resolveCombatSavingThrow";

describe("resolveCombatSavingThrow", () => {
	it("forces failure and consumes one charge", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.enemy = withSavingThrowModifier(combat.enemy, "automaticFailure", 2);

		const result = resolveCombatSavingThrow({
			combat,
			attackerSide: "player",
			defenderSide: "enemy",
			save: {
				attribute: "wisdom",
				dc: { base: 1, attribute: "wisdom", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			rngState: { value: 0 },
		});

		expect(result.value.automaticOutcome).toBe("failure");
		expect(result.value.success).toBe(false);
		expect(result.value.combat.enemy.activeEffects).toContainEqual(
			expect.objectContaining({ remainingCharges: 1 }),
		);
	});

	it("removes a roll modifier after its final charge", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.enemy = withSavingThrowModifier(combat.enemy, "automaticSuccess", 1);

		const result = resolveCombatSavingThrow({
			combat,
			attackerSide: "player",
			defenderSide: "enemy",
			save: {
				attribute: "wisdom",
				dc: { base: 100, attribute: "wisdom", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			rngState: { value: 0 },
		});

		expect(result.value.automaticOutcome).toBe("success");
		expect(result.value.success).toBe(true);
		expect(result.value.combat.enemy.activeEffects).toEqual([]);
	});

	it("retains a duration-only automatic modifier after use", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.enemy = withSavingThrowModifier(combat.enemy, "automaticSuccess");

		const result = resolveCombatSavingThrow({
			combat,
			attackerSide: "player",
			defenderSide: "enemy",
			save: {
				attribute: "wisdom",
				dc: { base: 100, attribute: "wisdom", includeProficiency: false, bonus: 0 },
				onSuccess: "noEffect",
			},
			rngState: { value: 0 },
		});

		expect(result.value.automaticOutcome).toBe("success");
		expect(result.value.success).toBe(true);
		expect(result.value.combat.enemy.activeEffects).toContainEqual(
			expect.objectContaining({
				id: "automatic-save",
				duration: { unit: "turns", remaining: 4 },
			}),
		);
	});
});

function withSavingThrowModifier(
	combatant: CombatantState,
	mode: "automaticSuccess" | "automaticFailure",
	remainingCharges?: number,
): CombatantState {
	return {
		...combatant,
		activeEffects: [
			{
				id: "automatic-save",
				type: "modifyRoll",
				sourceCombatantId: combatant.id,
				sourceSide: combatant.side,
				source: {
					type: "skill",
					skillId: "curse",
					sourceName: "Automatic Save",
					sourceEffectKey: "effect:0",
				},
				duration: { unit: "turns", remaining: 4 },
				...(remainingCharges === undefined ? {} : { remainingCharges }),
				roll: "savingThrow",
				mode,
			},
		],
	};
}
