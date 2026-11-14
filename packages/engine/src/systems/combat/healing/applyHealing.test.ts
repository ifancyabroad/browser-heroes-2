import { describe, expect, it } from "vitest";
import { createTestCombatState } from "../../../test/createTestRunState";
import { applyHealing } from "./applyHealing";

describe("applyHealing", () => {
	it("does not exceed maximum HP and reports actual healing", () => {
		const combatant = {
			...createTestCombatState().combat!.player,
			currentHp: 1,
		};

		const result = applyHealing(combatant, combatant.maxHp + 100);

		expect(result.combatant.currentHp).toBe(combatant.maxHp);
		expect(result.actualHealing).toBe(combatant.maxHp - 1);
	});
});
