import type { EquipmentSlot, Item } from "@app/content";

import type { EquippedItemState, HeroEquipmentState, HeroState } from "../../schemas";

import { previewEquipItem } from "./previewEquipItem";

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
	const preview = previewEquipItem({
		hero: input.hero,
		item: input.item,
		requestedSlot: input.requestedSlot,
	});

	if (!preview.ok) {
		return preview;
	}

	const equipment: HeroEquipmentState = {
		...input.hero.equipment,
	};

	for (const replacedItem of preview.replacedItems) {
		removeItemByInstanceId(equipment, replacedItem.instanceId);
	}

	equipment[preview.equipmentSlot] = {
		instanceId: input.instanceId,
		itemId: input.item.id,
	};

	return {
		ok: true,
		hero: {
			...input.hero,
			equipment,
		},
		equipmentSlot: preview.equipmentSlot,
		replacedItems: preview.replacedItems,
	};
}

function removeItemByInstanceId(equipment: HeroEquipmentState, instanceId: string): void {
	for (const slot of Object.keys(equipment) as EquipmentSlot[]) {
		if (equipment[slot]?.instanceId === instanceId) {
			equipment[slot] = null;
		}
	}
}
