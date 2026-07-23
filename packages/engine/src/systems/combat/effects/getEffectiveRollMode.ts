import type { Attribute, RollType } from "@app/content";

import type { ActiveRollModifier, CombatantState } from "../../../schemas";
import type { D20RollMode } from "../../../core/dice";

export function getEffectiveRollMode(
	combatant: CombatantState,
	roll: RollType,
	attribute?: Attribute,
): D20RollMode {
	const modifiers = combatant.activeEffects.filter(
		(effect): effect is ActiveRollModifier =>
			effect.type === "modifyRoll" &&
			effect.roll === roll &&
			(effect.attribute === undefined || effect.attribute === attribute),
	);

	const hasAdvantage = modifiers.some((modifier) => modifier.mode === "advantage");
	const hasDisadvantage = modifiers.some((modifier) => modifier.mode === "disadvantage");

	if (hasAdvantage === hasDisadvantage) {
		return "normal";
	}

	return hasAdvantage ? "advantage" : "disadvantage";
}
