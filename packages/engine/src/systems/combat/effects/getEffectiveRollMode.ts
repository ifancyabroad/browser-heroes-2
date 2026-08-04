import type { Attribute, RollMode, RollType } from "@app/content";

import type { ActiveRollModifier, CombatantState } from "../../../schemas";
import { combineD20RollModes, type D20RollMode } from "../../../core/dice";

export function getEffectiveRollMode(
	combatant: CombatantState,
	roll: RollType,
	attribute?: Attribute,
): D20RollMode {
	return getRollModeFromModifiers(getMatchingRollModifiers(combatant, roll, attribute));
}

export function getRollModeFromModifiers(modifiers: readonly ActiveRollModifier[]): D20RollMode {
	const rollModeModifiers = modifiers.filter(
		(modifier): modifier is ActiveRollModifier & { mode: RollMode } =>
			modifier.mode === "advantage" || modifier.mode === "disadvantage",
	);

	return combineD20RollModes(rollModeModifiers.map((modifier) => modifier.mode));
}

export function getMatchingRollModifiers(
	combatant: CombatantState,
	roll: RollType,
	attribute?: Attribute,
): ActiveRollModifier[] {
	return combatant.activeEffects.filter(
		(effect): effect is ActiveRollModifier =>
			effect.type === "modifyRoll" &&
			effect.roll === roll &&
			(effect.attribute === undefined || effect.attribute === attribute),
	);
}

export function getChargedRollModifierIds(modifiers: readonly ActiveRollModifier[]): string[] {
	return modifiers.flatMap((modifier) =>
		modifier.remainingCharges === undefined ? [] : [modifier.id],
	);
}
