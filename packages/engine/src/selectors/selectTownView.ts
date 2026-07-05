import { ITEMS_BY_ID, type EquipmentSlot, type Item } from "@app/content";

import type { EquippedItemState, RunState, TownShopSlot } from "../schemas";

import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { previewEquipItem } from "../systems/equipment/previewEquipItem";

export type TownShopDestinationView = {
	equipmentSlot: EquipmentSlot;
	replacedItems: readonly EquippedItemState[];
};

export type TownShopSlotView = {
	id: string;
	item: Item;
	price: number;
	purchased: boolean;
	canAfford: boolean;
	destinations: readonly TownShopDestinationView[];
	requiresEquipmentSlotSelection: boolean;
};

export type TownView = {
	shopLevel: number;
	gold: number;

	rerollCost: number;
	canAffordReroll: boolean;

	restCost: number;
	canAffordRest: boolean;
	isFullyHealed: boolean;

	shopSlots: readonly TownShopSlotView[];
};

export function selectTownView(state: RunState): TownView | null {
	if (state.phase !== "town" || !state.town) {
		return null;
	}

	return {
		shopLevel: state.town.shopLevel,
		gold: state.gold,

		rerollCost: state.town.rerollCost,
		canAffordReroll: state.gold >= state.town.rerollCost,

		restCost: state.town.restCost,
		canAffordRest: state.gold >= state.town.restCost,
		isFullyHealed: state.hero.currentHp >= state.hero.maxHp,

		shopSlots: state.town.shopSlots.flatMap((slot) => createTownShopSlotView(state, slot)),
	};
}

function createTownShopSlotView(state: RunState, slot: TownShopSlot): TownShopSlotView[] {
	const item = ITEMS_BY_ID[slot.itemId];

	if (!item) {
		return [];
	}

	const validEquipmentSlots = getValidEquipmentSlots(item);

	return [
		{
			id: slot.id,
			item,
			price: slot.price,
			purchased: slot.purchased,
			canAfford: !slot.purchased && state.gold >= slot.price,
			destinations: validEquipmentSlots.flatMap((equipmentSlot) => {
				const preview = previewEquipItem({
					hero: state.hero,
					item,
					requestedSlot: equipmentSlot,
				});

				if (!preview.ok) {
					return [];
				}

				return [
					{
						equipmentSlot: preview.equipmentSlot,
						replacedItems: preview.replacedItems,
					},
				];
			}),
			requiresEquipmentSlotSelection: validEquipmentSlots.length > 1,
		},
	];
}
