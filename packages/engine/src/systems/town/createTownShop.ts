import type { ItemId } from "@app/content";

import { createShopItemInstanceId, createTownShopSlotId } from "../../core/ids";
import { createContextRngState, randomInt, type RngResult, type RngState } from "../../core/rng";
import type { HeroState, TownShopSlot } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";
import { createRandomItemInstance } from "../items/createRandomItemInstance";

const TOWN_SHOP_SLOT_COUNT = 6;
const PRICE_VARIANCE = 10;
const PRICE_STEP = 5;

type CreateTownShopInput = {
	runId: string;
	seed: string;
	hero: HeroState;
	shopLevel: number;
	battleNumber: number;
	rerollCount: number;
	preservedSlots?: readonly TownShopSlot[];
};

type ShopSlotDraft =
	| { preserved: true; slot: TownShopSlot }
	| { preserved: false; slot: Omit<TownShopSlot, "price"> };

export function createTownShop(input: CreateTownShopInput): TownShopSlot[] {
	const shopSlots: ShopSlotDraft[] = [];
	const excludedLegendaryItemIds = new Set<ItemId>();
	const preservedSlots = new Map(input.preservedSlots?.map((slot) => [slot.id, slot]) ?? []);

	for (const slot of preservedSlots.values()) {
		if (slot.item.type === "static") {
			excludedLegendaryItemIds.add(slot.item.itemId);
		}
	}

	while (shopSlots.length < TOWN_SHOP_SLOT_COUNT) {
		const slotNumber = shopSlots.length + 1;
		const shopSlotId = createTownShopSlotId(input.runId, slotNumber);
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
			rngState: createContextRngState(
				input.seed,
				"shop-item",
				input.battleNumber,
				input.rerollCount,
				slotNumber,
			),
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
	}

	const pricedSlots: TownShopSlot[] = [];

	for (const [slotIndex, pendingSlot] of shopSlots.entries()) {
		if (pendingSlot.preserved) {
			pricedSlots.push(pendingSlot.slot);
			continue;
		}

		const item = getItemInstanceDefinition(pendingSlot.slot.item);
		const price = rollPrice(
			item.price,
			createContextRngState(
				input.seed,
				"shop-price",
				input.battleNumber,
				input.rerollCount,
				slotIndex + 1,
			),
		);

		pricedSlots.push({
			...pendingSlot.slot,
			price: price.value,
		});
	}

	return pricedSlots;
}

function rollPrice(price: number, rngState: RngState): RngResult<number> {
	const roll = randomInt(rngState, 100 - PRICE_VARIANCE, 100 + PRICE_VARIANCE);
	const variedPrice = (price * roll.value) / 100;

	return {
		value: Math.max(PRICE_STEP, Math.round(variedPrice / PRICE_STEP) * PRICE_STEP),
		rngState: roll.rngState,
	};
}
