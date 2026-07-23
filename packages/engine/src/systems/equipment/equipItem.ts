import type { EquipmentSlot } from "@app/content";

import type { EquippedItemState, HeroEquipmentState, HeroState } from "../../schemas";

import { previewEquipItem } from "./previewEquipItem";

import type { ItemInstance } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { adjustCurrentHpForMaxHpChange } from "../health/adjustCurrentHpForMaxHpChange";

type EquipItemInput = {
	hero: HeroState;
	item: ItemInstance;
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
	const itemDefinition = getItemInstanceDefinition(input.item);

	const preview = previewEquipItem({
		hero: input.hero,
		item: itemDefinition,
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

	equipment[preview.equipmentSlot] = input.item;

	const heroWithEquipment: HeroState = {
		...input.hero,
		equipment,
	};
	const previousMaxHp = deriveHeroStats(input.hero).health.maxHp;
	const nextMaxHp = deriveHeroStats(heroWithEquipment).health.maxHp;

	return {
		ok: true,
		hero: {
			...heroWithEquipment,
			currentHp: adjustCurrentHpForMaxHpChange(
				input.hero.currentHp,
				nextMaxHp - previousMaxHp,
			),
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
