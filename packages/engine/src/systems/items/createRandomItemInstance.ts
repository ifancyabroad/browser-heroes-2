import type { ItemId } from "@app/content";

import type { HeroState, ItemInstance } from "../../schemas";
import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { createGeneratedItemInstance } from "./createGeneratedItemInstance";
import { getEligibleLegendaryItems } from "./getEligibleLegendaryItems";
import { selectItemBase } from "./selectItemBase";
import { selectItemRarity } from "./selectItemRarity";
import { getTypeWeightedItemCandidates } from "./getTypeWeightedItemCandidates";

type CreateRandomItemInstanceInput = {
	hero: HeroState;
	instanceId: string;
	lootTier: number;
	rngState: RngState;
	excludedLegendaryItemIds: ReadonlySet<ItemId>;
};

export function createRandomItemInstance(
	input: CreateRandomItemInstanceInput,
): RngResult<ItemInstance> | null {
	const eligibleLegendaryItems = getEligibleLegendaryItems({
		hero: input.hero,
		excludedItemIds: input.excludedLegendaryItemIds,
	});

	const rarityResult = selectItemRarity({
		lootTier: input.lootTier,
		includeLegendary: eligibleLegendaryItems.length > 0,
		rngState: input.rngState,
	});

	if (rarityResult.value === "legendary") {
		const legendaryResult = selectWeightedItem(
			getTypeWeightedItemCandidates(eligibleLegendaryItems),
			rarityResult.rngState,
		);

		if (!legendaryResult) {
			throw new Error("Unable to select an eligible legendary item");
		}

		return {
			value: {
				instanceId: input.instanceId,
				type: "static",
				itemId: legendaryResult.value.id,
			},
			rngState: legendaryResult.rngState,
		};
	}

	const baseResult = selectItemBase({
		hero: input.hero,
		rngState: rarityResult.rngState,
	});

	if (!baseResult.ok) {
		return null;
	}

	const generatedResult = createGeneratedItemInstance({
		instanceId: input.instanceId,
		base: baseResult.value,
		rarity: rarityResult.value,
		rngState: baseResult.rngState,
	});

	return {
		value: generatedResult.value,
		rngState: generatedResult.rngState,
	};
}
