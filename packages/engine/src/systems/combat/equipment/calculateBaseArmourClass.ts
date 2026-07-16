import type { HeroEquipmentState } from "../../../schemas";
import { calculateAttributeModifier } from "../../../core/attributes";
import { getEquippedBodyArmour, type BodyArmour } from "../../equipment/getEquippedBodyArmour";

export function calculateBaseArmourClass(
	equipment: HeroEquipmentState,
	dexterityScore: number,
): number {
	const bodyArmour = getEquippedBodyArmour(equipment.body?.itemId);

	const dexterityModifier = calculateAttributeModifier(dexterityScore);

	if (!bodyArmour) {
		return 10 + dexterityModifier;
	}

	return calculateBodyArmourClass(bodyArmour, dexterityModifier);
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
