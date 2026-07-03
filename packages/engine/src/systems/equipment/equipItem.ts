import { ITEMS_BY_ID, type EquipmentSlot, type Item, type ItemId } from "@app/content";

import type { EquippedItemState, HeroEquipmentState, HeroState } from "../../schemas";

import { getValidEquipmentSlots } from "./getValidEquipmentSlots";

type EquipItemInput = {
	hero: HeroState;
	item: Item;
	instanceId: string;
	requestedSlot?: EquipmentSlot;
};

export type EquipItemSuccess = {
	ok: true;
	hero: HeroState;
	equipmentSlot: EquipmentSlot;
	replacedItems: EquippedItemState[];
};

export type EquipItemFailure = {
	ok: false;
	error: "INVALID_EQUIPMENT_SLOT";
};

export type EquipItemResult = EquipItemSuccess | EquipItemFailure;

export function equipItem(input: EquipItemInput): EquipItemResult {
	const equipmentSlot = getSelectedEquipmentSlot(input.item, input.requestedSlot);

	if (!equipmentSlot) {
		return {
			ok: false,
			error: "INVALID_EQUIPMENT_SLOT",
		};
	}

	const equipment: HeroEquipmentState = {
		...input.hero.equipment,
	};

	const replacedItems: EquippedItemState[] = [];

	removeItemAtSlot(equipment, equipmentSlot, replacedItems);
	resolveHandConflicts(equipment, input.item, replacedItems);

	equipment[equipmentSlot] = {
		instanceId: input.instanceId,
		itemId: input.item.id,
	};

	return {
		ok: true,
		hero: {
			...input.hero,
			equipment,
		},
		equipmentSlot,
		replacedItems,
	};
}

function getSelectedEquipmentSlot(
	item: Item,
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

function resolveHandConflicts(
	equipment: HeroEquipmentState,
	item: Item,
	replacedItems: EquippedItemState[],
): void {
	if (item.type === "weapon" && item.handedness === "twoHanded") {
		removeItemAtSlot(equipment, "offHand", replacedItems);
		return;
	}

	if (item.type !== "armour" || item.slot !== "shield") {
		return;
	}

	const mainHandItem = getEquippedItemDefinition(equipment.mainHand?.itemId);

	if (mainHandItem?.type === "weapon" && mainHandItem.handedness === "twoHanded") {
		removeItemAtSlot(equipment, "mainHand", replacedItems);
	}
}

function removeItemAtSlot(
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

	equipment[slot] = null;
}

function getEquippedItemDefinition(itemId: ItemId | undefined): Item | null {
	if (!itemId) {
		return null;
	}

	return ITEMS_BY_ID[itemId] ?? null;
}
