import type { HeroEquipmentState } from "../../../schemas";
import { calculateAttributeModifier } from "../../../core/attributes";

import { applyPassiveStatModifiers } from "../modifiers/applyStatModifiers";
import type { CombatModifier } from "../modifiers/applyStatModifiers";
import { getEquippedBodyArmour, type BodyArmour } from "./getEquippedBodyArmour";

export function calculatePlayerArmourClass(
	equipment: HeroEquipmentState,
	dexterityScore: number,
	passiveModifiers: readonly CombatModifier[],
): number {
	const bodyArmour = getEquippedBodyArmour(equipment.body?.itemId);
	const dexterityModifier = calculateAttributeModifier(dexterityScore);

	const baseArmourClass = bodyArmour
		? calculateBodyArmourClass(bodyArmour, dexterityModifier)
		: 10 + dexterityModifier;

	return Math.max(
		0,
		Math.floor(applyPassiveStatModifiers("armourClass", baseArmourClass, passiveModifiers)),
	);
}

function calculateBodyArmourClass(armour: BodyArmour, dexterityModifier: number): number {
	switch (armour.category) {
		case "cloth":
		case "light":
			return armour.armourClass + dexterityModifier;

		case "medium":
			return armour.armourClass + Math.min(2, Math.max(0, dexterityModifier));

		case "heavy":
			return armour.armourClass;
	}
}
