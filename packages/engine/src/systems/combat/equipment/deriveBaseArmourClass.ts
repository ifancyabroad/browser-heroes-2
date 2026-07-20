import type { HeroEquipmentState } from "../../../schemas";
import { calculateAttributeModifier } from "../../../core/attributes";
import { getEquippedBodyArmour, type BodyArmour } from "../../equipment/getEquippedBodyArmour";
import { getEquippedShield } from "../../equipment/getEquippedShield";

export type BaseArmourClassBreakdown = {
	baseValue: number;

	armour:
		| {
				type: "unarmoured";
				value: number;
		  }
		| {
				type: "bodyArmour";
				sourceName: string;
				value: number;
		  };

	dexterity: {
		modifier: number;
		applied: number;
	};

	shield: {
		sourceName: string;
		value: number;
	} | null;
};

export function deriveBaseArmourClass(
	equipment: HeroEquipmentState,
	dexterityScore: number,
): BaseArmourClassBreakdown {
	const bodyArmour = getEquippedBodyArmour(equipment.body);
	const shield = getEquippedShield(equipment.offHand);

	const dexterityModifier = calculateAttributeModifier(dexterityScore);

	const armour = bodyArmour
		? {
				type: "bodyArmour" as const,
				sourceName: bodyArmour.name,
				value: bodyArmour.armourClass,
			}
		: {
				type: "unarmoured" as const,
				value: 10,
			};

	const appliedDexterity = getAppliedDexterityModifier(bodyArmour, dexterityModifier);

	const shieldContribution = shield
		? {
				sourceName: shield.name,
				value: shield.armourClass,
			}
		: null;

	return {
		baseValue: armour.value + appliedDexterity + (shieldContribution?.value ?? 0),

		armour,

		dexterity: {
			modifier: dexterityModifier,
			applied: appliedDexterity,
		},

		shield: shieldContribution,
	};
}

function getAppliedDexterityModifier(armour: BodyArmour | null, dexterityModifier: number): number {
	if (!armour) {
		return dexterityModifier;
	}

	switch (armour.category) {
		case "cloth":
		case "light":
			return dexterityModifier;

		case "medium":
			return Math.min(2, Math.max(0, dexterityModifier));

		case "heavy":
			return 0;
	}
}
