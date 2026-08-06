import { describe, expect, it } from "vitest";

import {
	formatActiveEffectDetail,
	formatItemModifier,
	formatRiderEffect,
	formatSavingThrow,
	formatSavingThrowModifier,
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
		).toBe("Deal 1d4 Fire damage.");
	});

	it("keeps saving throws concise while identifying both relevant attributes", () => {
		const save = {
			attribute: "dexterity" as const,
			onSuccess: "halfDamage" as const,
			dc: {
				base: 11,
				attribute: "constitution" as const,
				includeProficiency: true,
				bonus: 3,
			},
		};

		expect(formatSavingThrow(save)).toBe("DEX save");
		expect(formatSavingThrowModifier(save)).toBe("Uses your CON modifier.");
		expect(
			formatSkillEffect({
				type: "damage",
				target: "enemy",
				damageType: "fire",
				dice: "10d6",
				requiresAttackRoll: false,
				save,
			}),
		).toBe("Deal 10d6 Fire damage. DEX save: half damage. Uses your CON modifier.");
	});

	it("leads negated effects with the failed save", () => {
		expect(
			formatSkillEffect({
				type: "applyStatus",
				target: "enemy",
				statusId: "stunned",
				duration: { unit: "turns", value: 1 },
				save: {
					attribute: "constitution",
					onSuccess: "noEffect",
					dc: {
						base: 8,
						attribute: "dexterity",
						includeProficiency: true,
						bonus: 0,
					},
				},
			}),
		).toBe("Failed CON save: stun the enemy for 1 turn. Uses your DEX modifier.");
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
				duration: { unit: "turns", value: 4 },
			}),
		).toBe("The enemy's next 2 WIS saves automatically fail within 4 turns.");
	});

	it("describes ongoing automatic saves without redundant wording", () => {
		expect(
			formatSkillEffect({
				type: "modifyRoll",
				target: "self",
				roll: "savingThrow",
				attribute: "dexterity",
				mode: "automaticSuccess",
				duration: { unit: "turns", value: 3 },
			}),
		).toBe("Your DEX saves automatically succeed for 3 turns.");
	});

	it("describes damage rolls as attacks", () => {
		expect(
			formatSkillEffect({
				type: "damage",
				target: "enemy",
				damageType: "piercing",
				dice: "1d8",
				attribute: "dexterity",
				requiresAttackRoll: true,
			}),
		).toBe("Attack for 1d8 + DEX Piercing damage.");
	});

	it("describes battle-duration effects with singular and plural labels", () => {
		expect(
			formatSkillEffect({
				type: "modifyStat",
				target: "self",
				stat: "armourClass",
				value: 6,
				duration: { unit: "battles", value: 3 },
			}),
		).toBe("Increase your Armour Class by 6 for 3 battles.");
		expect(
			formatSkillEffect({
				type: "shield",
				target: "self",
				amount: 4,
				duration: { unit: "battles", value: 1 },
			}),
		).toBe("Gain a 4-point shield for 1 battle.");
	});

	it("formats and classifies active automatic roll outcomes", () => {
		const effect = {
			id: "automatic-critical",
			type: "modifyRoll" as const,
			sourceCombatantId: "player",
			sourceSide: "player" as const,
			source: {
				type: "skill" as const,
				skillId: "focus_energy" as const,
				sourceName: "Focus Energy",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns" as const, remaining: 3 },
			remainingCharges: 1,
			roll: "attack" as const,
			mode: "automaticCritical" as const,
		};

		expect(formatActiveEffectDetail(effect)).toBe("Automatic critical hits on attack rolls");
		expect(getActiveEffectTone(effect)).toBe("positive");
	});
});
