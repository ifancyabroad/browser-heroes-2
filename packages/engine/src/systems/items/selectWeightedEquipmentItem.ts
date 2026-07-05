import { armourSlots, itemRarities, type Item, type ItemId } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import type { HeroState } from "../../schemas";
import { getEligibleEquipmentItems } from "./getEligibleEquipmentItems";
import {
	ITEM_RARITY_WEIGHTS,
	ITEM_TYPE_WEIGHTS,
	type ItemGenerationType,
} from "./itemGenerationWeights";

const ITEM_GENERATION_TYPES = [
	"weapon",
	...armourSlots,
] as const satisfies readonly ItemGenerationType[];

type SelectWeightedEquipmentItemInput = {
	hero: HeroState;
	itemLevel: number;
	excludedItemIds: ReadonlySet<ItemId>;
	rngState: RngState;
};

export function selectWeightedEquipmentItem(
	input: SelectWeightedEquipmentItemInput,
): RngResult<Item> | null {
	const weightedItems = getWeightedEquipmentItems(input);

	return selectWeightedItem(weightedItems, input.rngState);
}

function getWeightedEquipmentItems(
	input: Omit<SelectWeightedEquipmentItemInput, "rngState">,
): Array<{ value: Item; weight: number }> {
	const weightIndex = Math.min(Math.max(input.itemLevel - 1, 0), ITEM_RARITY_WEIGHTS.length - 1);

	return itemRarities.flatMap((rarity) =>
		ITEM_GENERATION_TYPES.flatMap((itemType) => {
			const weight = ITEM_RARITY_WEIGHTS[weightIndex][rarity] * ITEM_TYPE_WEIGHTS[itemType];

			if (weight <= 0) {
				return [];
			}

			const eligibleItems = getEligibleEquipmentItems({
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
