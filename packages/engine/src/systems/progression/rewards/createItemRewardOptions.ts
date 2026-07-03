import { armourSlots, itemRarities, type Item, type ItemId } from "@app/content";
import type { HeroState } from "../../../schemas";

import { selectWeightedItem, type RngResult, type RngState } from "../../../core/rng";

import { getEligibleRewardItems } from "./getEligibleRewardItems";
import { ITEM_RARITY_WEIGHTS, ITEM_TYPE_WEIGHTS, type ItemRewardType } from "./itemRewardWeights";

const ITEM_REWARD_TYPES = ["weapon", ...armourSlots] as const satisfies readonly ItemRewardType[];

const ITEM_REWARD_COUNT = 2;

export function createItemRewardOptions(
	hero: HeroState,
	zoneNumber: number,
	rngState: RngState,
): RngResult<[Item, Item]> {
	const selectedItems: Item[] = [];
	const excludedItemIds = new Set<ItemId>();
	let nextRngState = rngState;

	while (selectedItems.length < ITEM_REWARD_COUNT) {
		const weightedItems = getWeightedEligibleItems({
			hero,
			zoneNumber,
			excludedItemIds,
		});

		const selected = selectWeightedItem(weightedItems, nextRngState);

		if (!selected) {
			throw new Error("Unable to generate two eligible item reward options");
		}

		selectedItems.push(selected.value);
		excludedItemIds.add(selected.value.id);
		nextRngState = selected.rngState;
	}

	return {
		value: [selectedItems[0], selectedItems[1]],
		rngState: nextRngState,
	};
}

type GetWeightedEligibleItemsInput = {
	hero: HeroState;
	zoneNumber: number;
	excludedItemIds: ReadonlySet<ItemId>;
};

function getWeightedEligibleItems(
	input: GetWeightedEligibleItemsInput,
): Array<{ value: Item; weight: number }> {
	const weightIndex = Math.min(Math.max(input.zoneNumber - 1, 0), ITEM_RARITY_WEIGHTS.length - 1);

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
