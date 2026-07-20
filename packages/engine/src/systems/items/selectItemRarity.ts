import { itemRarities, type ItemRarity } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { ITEM_RARITY_WEIGHTS_BY_LOOT_TIER } from "./itemGenerationWeights";

type SelectItemRarityInput = {
	lootTier: number;
	availableRarities: ReadonlySet<ItemRarity>;
	rngState: RngState;
};

export function selectItemRarity(input: SelectItemRarityInput): RngResult<ItemRarity> {
	const weightIndex = Math.min(
		Math.max(input.lootTier - 1, 0),
		ITEM_RARITY_WEIGHTS_BY_LOOT_TIER.length - 1,
	);

	const weightedRarities = itemRarities.flatMap((rarity) => {
		if (!input.availableRarities.has(rarity)) {
			return [];
		}

		const weight = ITEM_RARITY_WEIGHTS_BY_LOOT_TIER[weightIndex][rarity];

		return weight > 0 ? [{ value: rarity, weight }] : [];
	});

	const selected = selectWeightedItem(weightedRarities, input.rngState);

	if (!selected) {
		throw new Error("No item rarity has a positive weight");
	}

	return selected;
}
