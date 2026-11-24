import { consumableIds, type ConsumableId, type Zone } from "@app/content";

import type { RunState, RuntimeItem, TownShopSlot } from "../schemas";

import { selectConsumableInventory, type ConsumableView } from "./selectConsumableInventory";
import {
	BATTLES_PER_ZONE,
	getZoneBattleNumber,
} from "../systems/encounters/zones/getZoneNumberForBattle";
import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";
import { deriveHeroStats } from "../systems/hero/deriveHeroStats";
import { isHeroFullyRested } from "../systems/hero/isHeroFullyRested";
import {
	calculateConsumableCost,
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
	zoneBattleNumber: number;
	battlesPerZone: number;
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
	isFullyRested: boolean;

	shopSlots: readonly TownShopSlotView[];

	consumables: Record<ConsumableId, TownConsumableView>;
};

export type TownConsumableView = ConsumableView & {
	price: number;
	canAfford: boolean;
	canBuy: boolean;
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

	return {
		battleNumber: state.battleNumber,
		zoneBattleNumber: getZoneBattleNumber(state.battleNumber),
		battlesPerZone: BATTLES_PER_ZONE,
		zoneNumber: state.zoneNumber,
		zone: state.zone,
		day: state.day,
		shopLevel: state.town.shopLevel,
		gold: state.gold,

		rerollCost,
		canAffordReroll: state.gold >= rerollCost,

		restCost,
		canAffordRest: state.gold >= restCost,
		isFullyHealed: state.hero.currentHp >= derivedHeroStats.health.maxHp,
		isFullyRested: isHeroFullyRested(state.hero, derivedHeroStats.health.maxHp),

		shopSlots: state.town.shopSlots.flatMap((slot) =>
			createTownShopSlotView(state, slot, effectiveCharisma),
		),

		consumables: selectTownConsumables(state, effectiveCharisma),
	};
}

function selectTownConsumables(
	state: RunState,
	effectiveCharisma: number,
): Record<ConsumableId, TownConsumableView> {
	const inventory = selectConsumableInventory(state.hero);
	return Object.fromEntries(
		consumableIds.map((id) => {
			const entry = inventory[id];
			const price = calculateConsumableCost(id, effectiveCharisma, state.zoneNumber);
			return [
				id,
				{
					...entry,
					price,
					canAfford: state.gold >= price,
					canBuy: entry.quantity < entry.maxCarry && state.gold >= price,
				},
			];
		}),
	) as Record<ConsumableId, TownConsumableView>;
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
