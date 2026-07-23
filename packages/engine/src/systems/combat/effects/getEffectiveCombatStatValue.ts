import type { CombatStat } from "@app/content";

import type { ActiveStatModifier, CombatantState } from "../../../schemas";

export function getEffectiveCombatStatValue(combatant: CombatantState, stat: CombatStat): number {
	const modifiers = combatant.activeEffects.filter(
		(effect): effect is ActiveStatModifier =>
			effect.type === "modifyStat" && effect.stat === stat,
	);

	const afterAdditions = modifiers
		.filter((modifier) => modifier.operation === "add")
		.reduce((value, modifier) => value + modifier.value, combatant.combatStats[stat]);

	const afterMultiplications = modifiers
		.filter((modifier) => modifier.operation === "multiply")
		.reduce((value, modifier) => value * modifier.value, afterAdditions);

	const setModifiers = modifiers.filter((modifier) => modifier.operation === "set");

	return setModifiers.length > 0
		? setModifiers[setModifiers.length - 1].value
		: afterMultiplications;
}
