import type { Attribute } from "@app/content";

import type { ActiveStatModifier, CombatantState } from "../../../schemas";

export function getEffectiveAttributeValue(
	combatant: CombatantState,
	attribute: Attribute,
): number {
	const modifiers = combatant.activeEffects.filter(
		(effect): effect is ActiveStatModifier =>
			effect.type === "modifyStat" && effect.stat === attribute,
	);

	const afterAdditions = modifiers
		.filter((modifier) => modifier.operation === "add")
		.reduce((value, modifier) => value + modifier.value, combatant.attributes[attribute]);

	const afterMultiplications = modifiers
		.filter((modifier) => modifier.operation === "multiply")
		.reduce((value, modifier) => value * modifier.value, afterAdditions);

	const setModifiers = modifiers.filter((modifier) => modifier.operation === "set");

	const finalValue =
		setModifiers.length > 0
			? setModifiers[setModifiers.length - 1].value
			: afterMultiplications;

	return Math.max(0, Math.floor(finalValue));
}
