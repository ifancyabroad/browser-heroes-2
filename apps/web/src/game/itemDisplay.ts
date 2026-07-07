import type { EquipmentSlot, Item, ItemRarity } from "@app/content";
import {
	armourCategoryLabels,
	armourSlotLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	weaponHandednessLabels,
	weaponTypeLabels,
} from "./displayLabels";

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

export function getItemKindLabel(item: Item) {
	if (item.type === "weapon") {
		return `${weaponHandednessLabels[item.handedness]} ${weaponTypeLabels[item.weaponType].toLowerCase()}`;
	}

	if (item.slot === "body") {
		return `${armourCategoryLabels[item.category]} armour`;
	}

	return armourSlotLabels[item.slot];
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

export function getPrimaryItemStat(item: Item): PrimaryItemStat | null {
	if (item.type === "weapon") {
		return {
			label: "Damage",
			value: `${item.damage.dice} ${damageTypeLabels[item.damage.type]}`,
		};
	}

	if (item.slot === "body") {
		return {
			label: "AC",
			value: String(item.armourClass),
		};
	}

	return null;
}
