import type { EquipmentSlot, ItemRarity } from "@app/content";
import {
	armourCategoryLabels,
	armourSlotLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	weaponTypeLabels,
} from "./labels";
import type { RuntimeItem } from "@app/engine";

export type PrimaryItemStat = {
	label: string;
	value: string;
};

export function getItemRarityTextClassName(rarity: ItemRarity) {
	switch (rarity) {
		case "common":
			return "text-common";
		case "uncommon":
			return "text-uncommon";
		case "rare":
			return "text-rare";
		case "epic":
			return "text-epic";
		case "legendary":
			return "text-legendary";
	}
}

export function getItemKindLabel(item: RuntimeItem) {
	if (item.type === "weapon") {
		return weaponTypeLabels[item.weaponType];
	}

	if (item.slot === "body") {
		return `${armourCategoryLabels[item.category]} armour`;
	}

	return armourSlotLabels[item.slot];
}

export function getItemSlotLabel(item: RuntimeItem) {
	if (item.type === "weapon") {
		return item.handedness === "twoHanded" ? "Both Hands" : "Hand";
	}

	switch (item.slot) {
		case "body":
			return equipmentSlotLabels.body;
		case "shield":
			return equipmentSlotLabels.offHand;
		case "helmet":
			return equipmentSlotLabels.head;
		case "gloves":
			return equipmentSlotLabels.hands;
		case "boots":
			return equipmentSlotLabels.feet;
		case "belt":
			return equipmentSlotLabels.waist;
		case "amulet":
			return equipmentSlotLabels.neck;
		case "ring":
			return "Finger";
	}
}

export function getEquipmentSlotLabel(slot: EquipmentSlot | readonly EquipmentSlot[]) {
	if (typeof slot === "string") {
		return equipmentSlotLabels[slot];
	}

	if (slot.length === 0) {
		return "No slot";
	}

	return slot.map((equipmentSlot) => equipmentSlotLabels[equipmentSlot]).join(" / ");
}

export function getPrimaryItemStat(item: RuntimeItem): PrimaryItemStat | null {
	if (item.type === "weapon") {
		return {
			label: "Damage",
			value: `${item.damage.dice} ${damageTypeLabels[item.damage.type]}`,
		};
	}

	if (item.slot === "body" || item.slot === "shield") {
		return {
			label: "AC",
			value: String(item.armourClass),
		};
	}

	return null;
}
