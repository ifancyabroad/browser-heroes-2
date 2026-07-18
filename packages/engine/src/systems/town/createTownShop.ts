import type { Item, ItemId } from "@app/content";

import type { RngResult, RngState } from "../../core/rng";
import { createShopItemInstanceId, createTownShopSlotId } from "../../core/ids";
import type { HeroState, TownShopSlot } from "../../schemas";
import { selectWeightedEquipmentItem } from "../items/selectWeightedEquipmentItem";
import { calculateTownDiscountMultiplier } from "./townPricing";

const TOWN_SHOP_SLOT_COUNT = 6;

type CreateTownShopInput = {
	runId: string;
	hero: HeroState;
	shopLevel: number;
	rngState: RngState;
};

export function createTownShop(input: CreateTownShopInput): RngResult<TownShopSlot[]> {
	const selectedItems: Item[] = [];
	const excludedItemIds = new Set<ItemId>();
	let rngState = input.rngState;

	while (selectedItems.length < TOWN_SHOP_SLOT_COUNT) {
		const selected = selectWeightedEquipmentItem({
			hero: input.hero,
			itemLevel: input.shopLevel,
			excludedItemIds,
			rngState,
		});

		if (!selected) {
			break;
		}

		selectedItems.push(selected.value);
		excludedItemIds.add(selected.value.id);
		rngState = selected.rngState;
	}

	const discountMultiplier = calculateTownDiscountMultiplier(input.hero);

	return {
		value: selectedItems.map((item, index) => {
			const shopSlotId = createTownShopSlotId(input.runId, index + 1);

			return {
				id: shopSlotId,
				item: {
					instanceId: createShopItemInstanceId(input.runId, shopSlotId, item.id),
					type: "static",
					itemId: item.id,
				},
				price: Math.round(item.price * discountMultiplier),
				purchased: false,
			};
		}),
		rngState,
	};
}
