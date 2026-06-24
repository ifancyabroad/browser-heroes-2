import type { ItemModifier, ModifiableStat, PassiveModifier } from "@app/content";

import { applyModifierOperation } from "./modifierOperations";

export type CombatModifier = ItemModifier | PassiveModifier;

export function applyPassiveStatModifiers(
	stat: ModifiableStat,
	baseValue: number,
	modifiers: readonly CombatModifier[],
): number {
	return modifiers.reduce((value, modifier) => {
		if (modifier.type !== "modifyStat" || modifier.stat !== stat) {
			return value;
		}

		return applyModifierOperation(value, modifier.operation, modifier.value);
	}, baseValue);
}
