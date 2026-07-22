import type { ItemId } from "@app/content";

import { createShopItemInstanceId, createTownShopSlotId } from "../../core/ids";
import type { RngResult, RngState } from "../../core/rng";
import type { HeroState, TownShopSlot } from "../../schemas";
import { createRandomItemInstance } from "../items/createRandomItemInstance";

const TOWN_SHOP_SLOT_COUNT = 6;

type CreateTownShopInput = {
	runId: string;
	hero: HeroState;
	shopLevel: number;
	battleNumber: number;
	rerollCount: number;
	rngState: RngState;
};

export function createTownShop(input: CreateTownShopInput): RngResult<TownShopSlot[]> {
	const shopSlots: TownShopSlot[] = [];
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

	return {
		value: shopSlots,
		rngState,
	};
}
