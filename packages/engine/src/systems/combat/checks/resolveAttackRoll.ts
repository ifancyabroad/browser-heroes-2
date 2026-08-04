import type { Attribute, RollMode, RollModifierMode } from "@app/content";

import type { CombatantState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import {
	combineD20RollModes,
	rollD20WithMode,
	type D20Roll,
	type D20RollMode,
} from "../../../core/dice";

import { getAttributeModifier } from "./getAttributeModifier";

import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";
import {
	getChargedRollModifierIds,
	getMatchingRollModifiers,
	getRollModeFromModifiers,
} from "../effects/getEffectiveRollMode";
import { calculateBaseProficiencyBonus } from "../rules/calculateBaseProficiencyBonus";

export type AttackRollResult = {
	roll: D20Roll;
	rolls: D20Roll[];
	rollMode: D20RollMode;
	attribute: Attribute;
	attributeModifier: number;
	proficiencyBonus: number;
	attackRollBonus: number;
	total: number;
	targetArmourClass: number;
	hit: boolean;
	critical: boolean;
	automaticOutcome: "hit" | "miss" | "critical" | null;
	consumedEffectIds: string[];
};

type ResolveAttackRollInput = {
	rngState: RngState;
	attacker: CombatantState;
	defender: CombatantState;
	attribute: Attribute;
	proficient: boolean;
	rollMode?: RollMode;
};

export function resolveAttackRoll(input: ResolveAttackRollInput): RngResult<AttackRollResult> {
	const activeModifiers = getMatchingRollModifiers(input.attacker, "attack");
	const rollMode = combineD20RollModes([
		getRollModeFromModifiers(activeModifiers),
		input.rollMode ?? "normal",
	]);
	const rollResult = rollD20WithMode(input.rngState, rollMode);
	const roll = rollResult.value.roll;

	const attributeModifier = getAttributeModifier(input.attacker, input.attribute);

	const proficiencyBonus = input.proficient
		? calculateBaseProficiencyBonus(input.attacker.level)
		: 0;

	const attackRollBonus = getEffectiveCombatStatValue(input.attacker, "attackRollBonus");

	const total = roll.roll + attributeModifier + proficiencyBonus + attackRollBonus;

	const targetArmourClass = getEffectiveCombatStatValue(input.defender, "armourClass");

	const criticalRangeBonus = getEffectiveCombatStatValue(input.attacker, "criticalRangeBonus");
	const criticalThreshold = 20 - criticalRangeBonus;
	const rolledOutcome = getRolledAttackOutcome(roll, total, targetArmourClass, criticalThreshold);
	const automaticOutcome = getAutomaticAttackOutcome(activeModifiers.map(({ mode }) => mode));
	const finalOutcome = applyAutomaticAttackOutcome(rolledOutcome, automaticOutcome);

	return {
		value: {
			roll,
			rolls: rollResult.value.rolls,
			rollMode,
			attribute: input.attribute,
			attributeModifier,
			proficiencyBonus,
			attackRollBonus,
			total,
			targetArmourClass,
			...finalOutcome,
			automaticOutcome,
			consumedEffectIds: getChargedRollModifierIds(activeModifiers),
		},
		rngState: rollResult.rngState,
	};
}

type AttackOutcome = { hit: boolean; critical: boolean };

function getRolledAttackOutcome(
	roll: D20Roll,
	total: number,
	targetArmourClass: number,
	criticalThreshold: number,
): AttackOutcome {
	const critical = roll.isNaturalTwenty || (!roll.isNaturalOne && roll.roll >= criticalThreshold);

	return {
		hit: critical || (!roll.isNaturalOne && total >= targetArmourClass),
		critical,
	};
}

function applyAutomaticAttackOutcome(
	rolledOutcome: AttackOutcome,
	automaticOutcome: AttackRollResult["automaticOutcome"],
): AttackOutcome {
	switch (automaticOutcome) {
		case "miss":
			return { hit: false, critical: false };
		case "hit":
			return { hit: true, critical: false };
		case "critical":
			return { hit: true, critical: true };
		default:
			return rolledOutcome;
	}
}

function getAutomaticAttackOutcome(modes: RollModifierMode[]): "hit" | "miss" | "critical" | null {
	const automaticFailure = modes.includes("automaticFailure");
	const automaticSuccess = modes.includes("automaticSuccess");
	const automaticCritical = modes.includes("automaticCritical");

	if (automaticFailure && (automaticSuccess || automaticCritical)) {
		return null;
	}

	if (automaticFailure) {
		return "miss";
	}

	if (automaticCritical) {
		return "critical";
	}

	return automaticSuccess ? "hit" : null;
}
