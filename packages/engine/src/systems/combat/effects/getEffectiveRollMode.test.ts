import { describe, expect, it } from "vitest";
import type { ActiveRollModifier, CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { getEffectiveRollMode } from "./getEffectiveRollMode";

describe("getEffectiveRollMode", () => {
	it.each([
		[[], "normal"],
		[["advantage"], "advantage"],
		[["disadvantage"], "disadvantage"],
		[["advantage", "disadvantage"], "normal"],
		[["advantage", "advantage", "disadvantage"], "normal"],
	] as const)("resolves %j to %s", (modes, expected) => {
		const combatant = withRollModifiers(
			createTestRunState().combat!.player,
			modes.map((mode, index) => createRollModifier(`effect-${index}`, mode)),
		);

		expect(getEffectiveRollMode(combatant, "attack")).toBe(expected);
	});

	it("only applies attribute-specific modifiers to matching saving throws", () => {
		const combatant = withRollModifiers(createTestRunState().combat!.player, [
			createRollModifier("strength-save", "advantage", "savingThrow", "strength"),
		]);

		expect(getEffectiveRollMode(combatant, "savingThrow", "strength")).toBe("advantage");
		expect(getEffectiveRollMode(combatant, "savingThrow", "dexterity")).toBe("normal");
		expect(getEffectiveRollMode(combatant, "attack", "strength")).toBe("normal");
	});
});

function withRollModifiers(
	combatant: CombatantState,
	activeEffects: ActiveRollModifier[],
): CombatantState {
	return {
		...combatant,
		activeEffects,
	};
}

function createRollModifier(
	id: string,
	mode: "advantage" | "disadvantage",
	roll: "attack" | "savingThrow" = "attack",
	attribute?: "strength" | "dexterity",
): ActiveRollModifier {
	return {
		id,
		type: "modifyRoll",
		sourceCombatantId: "player",
		source: {
			type: "skill",
			skillId: "armour_break",
			sourceName: "Test Roll Modifier",
			sourceEffectKey: id,
		},
		remainingTurns: 1,
		roll,
		mode,
		attribute,
	};
}
