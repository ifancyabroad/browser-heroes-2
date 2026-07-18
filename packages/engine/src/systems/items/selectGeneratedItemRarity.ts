import { itemRarities, type ItemRarity } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { ITEM_RARITY_WEIGHTS } from "./itemGenerationWeights";

type SelectGeneratedItemRarityInput = {
	itemLevel: number;
	rngState: RngState;
};

export function selectGeneratedItemRarity(
	input: SelectGeneratedItemRarityInput,
): RngResult<ItemRarity> {
	const weightIndex = Math.min(Math.max(input.itemLevel - 1, 0), ITEM_RARITY_WEIGHTS.length - 1);

	const weightedRarities = itemRarities.flatMap((rarity) => {
		const weight = ITEM_RARITY_WEIGHTS[weightIndex][rarity];

		if (weight <= 0) {
			return [];
		}

		return {
			value: rarity,
			weight,
		};
	});

	const selected = selectWeightedItem(weightedRarities, input.rngState);

	if (!selected) {
		return {
			value: "common",
			rngState: input.rngState,
		};
	}

	return selected;
}
