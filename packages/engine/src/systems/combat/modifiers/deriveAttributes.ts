import type { Attribute, Attributes } from "@app/content";

import { MAX_ATTRIBUTE_SCORE } from "../../../core/attributes";
import type { DerivedValue, ResolvedModifier } from "./modifier.types";
import { resolveAdditiveStat } from "./resolveAdditiveStat";

export type DerivedAttributes = Record<Attribute, DerivedValue>;

export function deriveAttributes(
	attributes: Attributes,
	modifiers: readonly ResolvedModifier[],
): DerivedAttributes {
	return {
		strength: resolveAttribute("strength", attributes.strength, modifiers),
		dexterity: resolveAttribute("dexterity", attributes.dexterity, modifiers),
		constitution: resolveAttribute("constitution", attributes.constitution, modifiers),
		intelligence: resolveAttribute("intelligence", attributes.intelligence, modifiers),
		wisdom: resolveAttribute("wisdom", attributes.wisdom, modifiers),
		charisma: resolveAttribute("charisma", attributes.charisma, modifiers),
	};
}

function resolveAttribute(
	attribute: Attribute,
	baseValue: number,
	modifiers: readonly ResolvedModifier[],
): DerivedValue {
	const derivedValue = resolveAdditiveStat(attribute, baseValue, modifiers);

	return {
		...derivedValue,
		value: Math.min(MAX_ATTRIBUTE_SCORE, Math.floor(derivedValue.value)),
	};
}
