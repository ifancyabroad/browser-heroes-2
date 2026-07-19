import { itemRarities, type ItemRarity } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { ITEM_RARITY_WEIGHTS } from "./itemGenerationWeights";

type SelectItemRarityInput = {
	itemLevel: number;
	includeLegendary: boolean;
	rngState: RngState;
};

export function selectItemRarity(input: SelectItemRarityInput): RngResult<ItemRarity> {
	const weightIndex = Math.min(Math.max(input.itemLevel - 1, 0), ITEM_RARITY_WEIGHTS.length - 1);

	const weightedRarities = itemRarities.flatMap((rarity) => {
		if (rarity === "legendary" && !input.includeLegendary) {
			return [];
		}

		const weight = ITEM_RARITY_WEIGHTS[weightIndex][rarity];

		return weight > 0 ? [{ value: rarity, weight }] : [];
	});

	const selected = selectWeightedItem(weightedRarities, input.rngState);

	if (!selected) {
		throw new Error("No item rarity has a positive weight");
	}

	return selected;
}
