import type { Item, ItemId } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import type { HeroState, TownShopSlot } from "../../schemas";
import { createTownShopSlotId } from "../../core/ids";
import { getEligibleRewardItems } from "../progression/rewards/getEligibleRewardItems";
import {
	ITEM_RARITY_WEIGHTS,
	ITEM_TYPE_WEIGHTS,
	type ItemRewardType,
} from "../progression/rewards/itemRewardWeights";
import { armourSlots, itemRarities } from "@app/content";
import { calculateTownDiscountMultiplier } from "./townPricing";

const TOWN_SHOP_SLOT_COUNT = 6;

const ITEM_REWARD_TYPES = ["weapon", ...armourSlots] as const satisfies readonly ItemRewardType[];

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
		const weightedItems = getWeightedShopItems({
			hero: input.hero,
			shopLevel: input.shopLevel,
			excludedItemIds,
		});

		const selected = selectWeightedItem(weightedItems, rngState);

		if (!selected) {
			break;
		}

		selectedItems.push(selected.value);
		excludedItemIds.add(selected.value.id);
		rngState = selected.rngState;
	}

	const discountMultiplier = calculateTownDiscountMultiplier(input.hero);

	return {
		value: selectedItems.map((item, index) => ({
			id: createTownShopSlotId(input.runId, index + 1),
			itemId: item.id,
			price: Math.round(item.price * discountMultiplier),
			purchased: false,
		})),
		rngState,
	};
}

type GetWeightedShopItemsInput = {
	hero: HeroState;
	shopLevel: number;
	excludedItemIds: ReadonlySet<ItemId>;
};

function getWeightedShopItems(
	input: GetWeightedShopItemsInput,
): Array<{ value: Item; weight: number }> {
	const weightIndex = Math.min(Math.max(input.shopLevel - 1, 0), ITEM_RARITY_WEIGHTS.length - 1);

	return itemRarities.flatMap((rarity) =>
		ITEM_REWARD_TYPES.flatMap((itemType) => {
			const weight = ITEM_RARITY_WEIGHTS[weightIndex][rarity] * ITEM_TYPE_WEIGHTS[itemType];

			if (weight <= 0) {
				return [];
			}

			const eligibleItems = getEligibleRewardItems({
				hero: input.hero,
				itemType,
				rarity,
				excludedItemIds: input.excludedItemIds,
			});

			return eligibleItems.map((item) => ({
				value: item,
				weight,
			}));
		}),
	);
}
