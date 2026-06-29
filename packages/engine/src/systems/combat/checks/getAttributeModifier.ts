import type { Attribute } from "@app/content";

import type { CombatantState } from "../../../schemas";

import { calculateAttributeModifier } from "../../../core/attributes";
import { getEffectiveAttributeValue } from "../effects/getEffectiveAttributeValue";

export function getAttributeModifier(combatant: CombatantState, attribute: Attribute): number {
	return calculateAttributeModifier(getEffectiveAttributeValue(combatant, attribute));
}
