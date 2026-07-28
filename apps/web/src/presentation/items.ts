import type { EquipmentSlot, ItemRarity } from "@app/content";
import {
	armourCategoryLabels,
	armourSlotLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	weaponHandednessLabels,
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
