import type { Attribute, RollType } from "@app/content";

import type { ActiveRollModifier, CombatantState } from "../../../schemas";
import { combineD20RollModes, type D20RollMode } from "../../../core/dice";

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

	return combineD20RollModes(modifiers.map((modifier) => modifier.mode));
}
