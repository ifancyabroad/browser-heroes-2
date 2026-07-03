import type { EquipmentSlot, Item } from "@app/content";

export function getValidEquipmentSlots(item: Item): EquipmentSlot[] {
	if (item.type === "weapon") {
		return ["mainHand"];
	}

	switch (item.slot) {
		case "body":
			return ["body"];

		case "shield":
			return ["offHand"];

		case "helmet":
			return ["head"];

		case "gloves":
			return ["hands"];

		case "boots":
			return ["feet"];

		case "belt":
			return ["waist"];

		case "amulet":
			return ["neck"];

		case "ring":
			return ["finger1", "finger2"];
	}
}
