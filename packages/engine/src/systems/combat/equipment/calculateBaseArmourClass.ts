import type { HeroEquipmentState } from "../../../schemas";
import { calculateAttributeModifier } from "../../../core/attributes";
import { getEquippedBodyArmour, type BodyArmour } from "../../equipment/getEquippedBodyArmour";
import { getEquippedShield } from "../../equipment/getEquippedShield";

export function calculateBaseArmourClass(
	equipment: HeroEquipmentState,
	dexterityScore: number,
): number {
	const bodyArmour = getEquippedBodyArmour(equipment.body);
	const shield = getEquippedShield(equipment.offHand);
	const shieldBonus = shield?.armourClass ?? 0;

	const dexterityModifier = calculateAttributeModifier(dexterityScore);

	if (!bodyArmour) {
		return 10 + dexterityModifier + shieldBonus;
	}

	return calculateBodyArmourClass(bodyArmour, dexterityModifier) + shieldBonus;
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
