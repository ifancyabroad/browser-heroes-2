import type { Attribute } from "@app/content";
import type { CombatantState } from "../../../schemas";

import { applyPassiveStatModifiers, type CombatModifier } from "./applyStatModifiers";

export function applyAttributeModifiers(
	attributes: CombatantState["attributes"],
	modifiers: readonly CombatModifier[],
): CombatantState["attributes"] {
	return {
		strength: applyAttributeModifier("strength", attributes.strength, modifiers),
		dexterity: applyAttributeModifier("dexterity", attributes.dexterity, modifiers),
		constitution: applyAttributeModifier("constitution", attributes.constitution, modifiers),
		intelligence: applyAttributeModifier("intelligence", attributes.intelligence, modifiers),
		wisdom: applyAttributeModifier("wisdom", attributes.wisdom, modifiers),
		charisma: applyAttributeModifier("charisma", attributes.charisma, modifiers),
	};
}

function applyAttributeModifier(
	attribute: Attribute,
	baseValue: number,
	modifiers: readonly CombatModifier[],
): number {
	return Math.floor(applyPassiveStatModifiers(attribute, baseValue, modifiers));
}
