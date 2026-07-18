import { type EquipmentSlot, type Zone } from "@app/content";

import type { EquippedItemState, RunState, RuntimeItem, TownShopSlot } from "../schemas";

import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { previewEquipItem } from "../systems/equipment/previewEquipItem";
import { MAX_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";
import { getZoneForRun } from "../systems/encounters/zones/getZoneForRun";
import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";

export type TownShopDestinationView = {
	equipmentSlot: EquipmentSlot;
	replacedItems: readonly EquippedItemState[];
};

export type TownShopSlotView = {
	id: string;
	item: RuntimeItem;
	price: number;
	purchased: boolean;
	canAfford: boolean;
	destinations: readonly TownShopDestinationView[];
	requiresEquipmentSlotSelection: boolean;
};

export type TownView = {
	battleNumber: number;
	zoneNumber: number;
	zone: Zone;
	day: number;
	shopLevel: number;
	gold: number;

	rerollCost: number;
	canAffordReroll: boolean;

	restCost: number;
	canAffordRest: boolean;
	isFullyHealed: boolean;

	shopSlots: readonly TownShopSlotView[];

	healingPotions: number;
	maxHealingPotions: number;
	healingPotionCost: number;
	canAffordHealingPotion: boolean;
	canBuyHealingPotion: boolean;
};

export function selectTownView(state: RunState): TownView | null {
	if (state.phase !== "town" || !state.town) {
		return null;
	}

	return {
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: getZoneForRun(state.zoneNumber),
		day: state.day,
		shopLevel: state.town.shopLevel,
		gold: state.gold,

		rerollCost: state.town.rerollCost,
		canAffordReroll: state.gold >= state.town.rerollCost,

		restCost: state.town.restCost,
		canAffordRest: state.gold >= state.town.restCost,
		isFullyHealed: state.hero.currentHp >= state.hero.maxHp,

		shopSlots: state.town.shopSlots.flatMap((slot) => createTownShopSlotView(state, slot)),

		healingPotions: state.hero.healingPotions,
		maxHealingPotions: MAX_HEALING_POTIONS,
		healingPotionCost: state.town.healingPotionCost,
		canAffordHealingPotion: state.gold >= state.town.healingPotionCost,
		canBuyHealingPotion:
			state.hero.healingPotions < MAX_HEALING_POTIONS &&
			state.gold >= state.town.healingPotionCost,
	};
}

function createTownShopSlotView(state: RunState, slot: TownShopSlot): TownShopSlotView[] {
	const item = getItemInstanceDefinition(slot.item);

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
