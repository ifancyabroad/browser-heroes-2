import { describe, expect, it } from "vitest";
import type { RollModifierMode } from "@app/content";
import type { ActiveRollModifier, CombatantState } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { getChargedRollModifierIds, getEffectiveRollMode } from "./getEffectiveRollMode";

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

	it("selects only the first charged modifier for each distinct mode", () => {
		const modifiers = [
			createRollModifier("critical-1", "automaticCritical", "attack", undefined, 1),
			createRollModifier("critical-2", "automaticCritical", "attack", undefined, 2),
			createRollModifier("duration-only", "advantage"),
			createRollModifier("advantage", "advantage", "attack", undefined, 1),
			createRollModifier("disadvantage", "disadvantage", "attack", undefined, 1),
			createRollModifier("automatic-success", "automaticSuccess", "attack", undefined, 1),
			createRollModifier("automatic-failure", "automaticFailure", "attack", undefined, 1),
		];

		expect(getChargedRollModifierIds(modifiers)).toEqual([
			"critical-1",
			"advantage",
			"disadvantage",
			"automatic-success",
			"automatic-failure",
		]);
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
	mode: RollModifierMode,
	roll: "attack" | "savingThrow" = "attack",
	attribute?: "strength" | "dexterity",
	remainingCharges?: number,
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
		remainingCharges,
	};
}
