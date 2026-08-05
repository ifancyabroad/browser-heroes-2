import type { ItemId } from "@app/content";

import { createShopItemInstanceId, createTownShopSlotId } from "../../core/ids";
import { randomInt, type RngResult, type RngState } from "../../core/rng";
import type { HeroState, TownShopSlot } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";
import { createRandomItemInstance } from "../items/createRandomItemInstance";

const TOWN_SHOP_SLOT_COUNT = 6;
const PRICE_VARIANCE = 10;
const PRICE_STEP = 5;

type CreateTownShopInput = {
	runId: string;
	hero: HeroState;
	shopLevel: number;
	battleNumber: number;
	rerollCount: number;
	rngState: RngState;
	preservedSlots?: readonly TownShopSlot[];
};

type ShopSlotDraft =
	| { preserved: true; slot: TownShopSlot }
	| { preserved: false; slot: Omit<TownShopSlot, "price"> };

export function createTownShop(input: CreateTownShopInput): RngResult<TownShopSlot[]> {
	const shopSlots: ShopSlotDraft[] = [];
	const excludedLegendaryItemIds = new Set<ItemId>();
	const preservedSlots = new Map(input.preservedSlots?.map((slot) => [slot.id, slot]) ?? []);

	for (const slot of preservedSlots.values()) {
		if (slot.item.type === "static") {
			excludedLegendaryItemIds.add(slot.item.itemId);
		}
	}

	let rngState = input.rngState;

	while (shopSlots.length < TOWN_SHOP_SLOT_COUNT) {
		const shopSlotId = createTownShopSlotId(input.runId, shopSlots.length + 1);
		const preservedSlot = preservedSlots.get(shopSlotId);

		if (preservedSlot) {
			shopSlots.push({ preserved: true, slot: preservedSlot });
			continue;
		}

		const itemResult = createRandomItemInstance({
			hero: input.hero,
			instanceId: createShopItemInstanceId(
				input.runId,
				input.battleNumber,
				input.rerollCount,
				shopSlotId,
			),
			lootTier: input.shopLevel,
			excludedLegendaryItemIds,
			rngState,
		});

		shopSlots.push({
			preserved: false,
			slot: {
				id: shopSlotId,
				item: itemResult.value,
				purchased: false,
			},
		});

		if (itemResult.value.type === "static") {
			excludedLegendaryItemIds.add(itemResult.value.itemId);
		}

		rngState = itemResult.rngState;
	}

	const pricedSlots: TownShopSlot[] = [];

	for (const pendingSlot of shopSlots) {
		if (pendingSlot.preserved) {
			pricedSlots.push(pendingSlot.slot);
			continue;
		}

		const item = getItemInstanceDefinition(pendingSlot.slot.item);
		const price = rollPrice(item.price, rngState);

		pricedSlots.push({
			...pendingSlot.slot,
			price: price.value,
		});
		rngState = price.rngState;
	}

	return {
		value: pricedSlots,
		rngState,
	};
}

function rollPrice(price: number, rngState: RngState): RngResult<number> {
	const roll = randomInt(rngState, 100 - PRICE_VARIANCE, 100 + PRICE_VARIANCE);
	const variedPrice = (price * roll.value) / 100;

	return {
		value: Math.max(PRICE_STEP, Math.round(variedPrice / PRICE_STEP) * PRICE_STEP),
		rngState: roll.rngState,
	};
}
