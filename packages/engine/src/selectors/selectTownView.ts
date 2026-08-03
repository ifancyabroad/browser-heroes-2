import { type EquipmentSlot, type Zone } from "@app/content";

import type { EquippedItemState, RunState, RuntimeItem, TownShopSlot } from "../schemas";

import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { previewEquipItem } from "../systems/equipment/previewEquipItem";
import { MAX_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";
import { getZoneForRun } from "../systems/encounters/zones/getZoneForRun";
import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";
import { deriveHeroStats } from "../systems/hero/deriveHeroStats";
import {
	calculateHealingPotionCost,
	calculateRerollCost,
	calculateRestCost,
	calculateTownItemPrice,
} from "../systems/town/townPricing";

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

	const derivedHeroStats = deriveHeroStats(state.hero);
	const effectiveCharisma = derivedHeroStats.effectiveAttributes.charisma;

	const rerollCost = calculateRerollCost(effectiveCharisma, state.town.rerollCount);

	const restCost = calculateRestCost(effectiveCharisma, state.day);

	const healingPotionCost = calculateHealingPotionCost(effectiveCharisma, state.zoneNumber);

	return {
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: getZoneForRun(state.zoneNumber),
		day: state.day,
		shopLevel: state.town.shopLevel,
		gold: state.gold,

		rerollCost,
		canAffordReroll: state.gold >= rerollCost,

		restCost,
		canAffordRest: state.gold >= restCost,
		isFullyHealed: state.hero.currentHp >= derivedHeroStats.health.maxHp,

		shopSlots: state.town.shopSlots.flatMap((slot) =>
			createTownShopSlotView(state, slot, effectiveCharisma),
		),

		healingPotions: state.hero.healingPotions,
		maxHealingPotions: MAX_HEALING_POTIONS,
		healingPotionCost,
		canAffordHealingPotion: state.gold >= healingPotionCost,
		canBuyHealingPotion:
			state.hero.healingPotions < MAX_HEALING_POTIONS && state.gold >= healingPotionCost,
	};
}

function createTownShopSlotView(
	state: RunState,
	slot: TownShopSlot,
	effectiveCharisma: number,
): TownShopSlotView[] {
	const item = getItemInstanceDefinition(slot.item);
	const price = calculateTownItemPrice(slot.price, effectiveCharisma);

	const validEquipmentSlots = getValidEquipmentSlots(item);

	return [
		{
			id: slot.id,
			item,
			price,
			purchased: slot.purchased,
			canAfford: !slot.purchased && state.gold >= price,
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
