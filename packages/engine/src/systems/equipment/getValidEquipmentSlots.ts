import type { EquipmentSlot, ItemBase } from "@app/content";
import { RuntimeItem } from "../../schemas";

type EquippableItem = RuntimeItem | ItemBase;

export function getValidEquipmentSlots(item: EquippableItem): EquipmentSlot[] {
	if (item.type === "weapon") {
		return item.handedness === "oneHanded" ? ["mainHand", "offHand"] : ["mainHand"];
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
