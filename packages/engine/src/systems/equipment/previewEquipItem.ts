import type { EquipmentSlot } from "@app/content";

import type { EquippedItemState, HeroEquipmentState, HeroState, RuntimeItem } from "../../schemas";

import { getValidEquipmentSlots } from "./getValidEquipmentSlots";

import { getEquippedWeapon } from "./getEquippedWeapon";

type PreviewEquipItemInput = {
	hero: HeroState;
	item: RuntimeItem;
	requestedSlot?: EquipmentSlot;
};

export type PreviewEquipItemSuccess = {
	ok: true;
	equipmentSlot: EquipmentSlot;
	replacedItems: EquippedItemState[];
};

export type PreviewEquipItemFailure = {
	ok: false;
	error: "INVALID_EQUIPMENT_SLOT";
};

export type PreviewEquipItemResult = PreviewEquipItemSuccess | PreviewEquipItemFailure;

export function previewEquipItem(input: PreviewEquipItemInput): PreviewEquipItemResult {
	const equipmentSlot = getSelectedEquipmentSlot(input.item, input.requestedSlot);

	if (!equipmentSlot) {
		return {
			ok: false,
			error: "INVALID_EQUIPMENT_SLOT",
		};
	}

	if (equipmentSlot === "offHand" && hasTwoHandedMainHand(input.hero.equipment)) {
		return {
			ok: false,
			error: "INVALID_EQUIPMENT_SLOT",
		};
	}

	const replacedItems: EquippedItemState[] = [];

	collectItemAtSlot(input.hero.equipment, equipmentSlot, replacedItems);
	collectHandConflicts(input.hero.equipment, input.item, replacedItems);

	return {
		ok: true,
		equipmentSlot,
		replacedItems,
	};
}

function getSelectedEquipmentSlot(
	item: RuntimeItem,
	requestedSlot: EquipmentSlot | undefined,
): EquipmentSlot | null {
	const validSlots = getValidEquipmentSlots(item);

	if (validSlots.length === 1) {
		const fixedSlot = validSlots[0];

		if (requestedSlot !== undefined && requestedSlot !== fixedSlot) {
			return null;
		}

		return fixedSlot;
	}

	if (requestedSlot !== undefined && validSlots.includes(requestedSlot)) {
		return requestedSlot;
	}

	return null;
}

function collectHandConflicts(
	equipment: HeroEquipmentState,
	item: RuntimeItem,
	replacedItems: EquippedItemState[],
): void {
	if (item.type === "weapon" && item.handedness === "twoHanded") {
		collectItemAtSlot(equipment, "offHand", replacedItems);
		return;
	}

	if (item.type !== "armour" || item.slot !== "shield") {
		return;
	}

	const mainHandWeapon = getEquippedWeapon(equipment.mainHand);

	if (mainHandWeapon?.handedness === "twoHanded") {
		collectItemAtSlot(equipment, "mainHand", replacedItems);
	}
}

function collectItemAtSlot(
	equipment: HeroEquipmentState,
	slot: EquipmentSlot,
	replacedItems: EquippedItemState[],
): void {
	const equippedItem = equipment[slot];

	if (!equippedItem) {
		return;
	}

	if (!replacedItems.some((item) => item.instanceId === equippedItem.instanceId)) {
		replacedItems.push(equippedItem);
	}
}

function hasTwoHandedMainHand(equipment: HeroEquipmentState): boolean {
	return getEquippedWeapon(equipment.mainHand)?.handedness === "twoHanded";
}
