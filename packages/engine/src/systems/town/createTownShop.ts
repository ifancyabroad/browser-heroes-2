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
};

type UnpricedSlot = Omit<TownShopSlot, "price">;

export function createTownShop(input: CreateTownShopInput): RngResult<TownShopSlot[]> {
	const shopSlots: UnpricedSlot[] = [];
	const excludedLegendaryItemIds = new Set<ItemId>();

	let rngState = input.rngState;

	while (shopSlots.length < TOWN_SHOP_SLOT_COUNT) {
		const shopSlotId = createTownShopSlotId(input.runId, shopSlots.length + 1);

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
			id: shopSlotId,
			item: itemResult.value,
			purchased: false,
		});

		if (itemResult.value.type === "static") {
			excludedLegendaryItemIds.add(itemResult.value.itemId);
		}

		rngState = itemResult.rngState;
	}

	const pricedSlots: TownShopSlot[] = [];

	for (const slot of shopSlots) {
		const item = getItemInstanceDefinition(slot.item);
		const price = rollPrice(item.price, rngState);

		pricedSlots.push({
			...slot,
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
