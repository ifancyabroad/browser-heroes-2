import { type Zone } from "@app/content";

import type { RunState, RuntimeItem, TownShopSlot } from "../schemas";

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
import { type EquipmentPlacementView, selectEquipmentPlacement } from "./selectEquipmentPlacement";

export type TownShopSlotView = {
	id: string;
	item: RuntimeItem;
	price: number;
	purchased: boolean;
	locked: boolean;
	canAfford: boolean;
	equipmentPlacement: EquipmentPlacementView;
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

	const rerollCost = calculateRerollCost(
		effectiveCharisma,
		state.town.shopLevel,
		state.town.rerollCount,
	);

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

	const equipmentPlacement = selectEquipmentPlacement(state.hero, item);

	return [
		{
			id: slot.id,
			item,
			price,
			purchased: slot.purchased,
			locked: state.shopLocks.some((lock) => lock.id === slot.id),
			canAfford: !slot.purchased && state.gold >= price,
			equipmentPlacement,
		},
	];
}
