import type { Attribute } from "@app/content";

import type { CombatantState } from "../../../schemas";

import { calculateAttributeModifier } from "../../../core/attributes";

export function getAttributeModifier(combatant: CombatantState, attribute: Attribute): number {
	return calculateAttributeModifier(combatant.attributes[attribute]);
}
