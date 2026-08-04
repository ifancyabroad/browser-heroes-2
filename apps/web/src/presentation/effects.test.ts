import { describe, expect, it } from "vitest";

import {
	formatActiveEffectDetail,
	formatItemModifier,
	formatRiderEffect,
	formatSkillEffect,
	getActiveEffectTone,
} from "./effects";

describe("effect presentation", () => {
	it("distinguishes typed amplification from added rider damage", () => {
		expect(
			formatItemModifier({
				type: "modifyDamage",
				damageType: "fire",
				operation: "add",
				value: 2,
			}),
		).toBe("+2 to fire damage dealt");
		expect(
			formatRiderEffect({
				type: "damage",
				target: "enemy",
				damageType: "fire",
				dice: "1d4",
				requiresAttackRoll: false,
			}),
		).toBe("The enemy takes 1d4 Fire damage.");
	});

	it("describes universal damage and round healing multipliers clearly", () => {
		expect(formatItemModifier({ type: "modifyDamage", operation: "add", value: 1 })).toBe(
			"+1 to all damage dealt",
		);
		expect(formatItemModifier({ type: "modifyHealing", multiplier: 1.4 })).toBe("+40% healing");
	});

	it("describes charged automatic roll outcomes", () => {
		expect(
			formatSkillEffect({
				type: "modifyRoll",
				target: "enemy",
				roll: "savingThrow",
				attribute: "wisdom",
				mode: "automaticFailure",
				charges: 2,
				durationTurns: 4,
			}),
		).toBe(
			"Make the enemy's next 2 WIS saving throws automatically fail. Expires after 4 turns.",
		);
	});

	it("formats and classifies active automatic roll outcomes", () => {
		const effect = {
			id: "automatic-critical",
			type: "modifyRoll" as const,
			sourceCombatantId: "player",
			source: {
				type: "skill" as const,
				skillId: "focus_energy" as const,
				sourceName: "Focus Energy",
				sourceEffectKey: "effect:0",
			},
			remainingTurns: 3,
			remainingCharges: 1,
			roll: "attack" as const,
			mode: "automaticCritical" as const,
		};

		expect(formatActiveEffectDetail(effect)).toBe("Automatic critical hits on attack rolls");
		expect(getActiveEffectTone(effect)).toBe("positive");
	});
});
