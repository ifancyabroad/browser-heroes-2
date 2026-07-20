import { generatedItemRarities, type ItemId, type ItemRarity } from "@app/content";

import type { HeroState, ItemInstance } from "../../schemas";
import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { createGeneratedItemInstance } from "./createGeneratedItemInstance";
import { getEligibleLegendaryItems } from "./getEligibleLegendaryItems";
import { getEligibleItemBases, selectItemBase } from "./selectItemBase";
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
): RngResult<ItemInstance> {
	const eligibleLegendaryItems = getEligibleLegendaryItems({
		hero: input.hero,
		excludedItemIds: input.excludedLegendaryItemIds,
	});

	const availableRarities = new Set<ItemRarity>();

	for (const rarity of generatedItemRarities) {
		const eligibleBases = getEligibleItemBases({
			hero: input.hero,
			rarity,
		});

		if (eligibleBases.length > 0) {
			availableRarities.add(rarity);
		}
	}

	if (eligibleLegendaryItems.length > 0) {
		availableRarities.add("legendary");
	}

	const rarityResult = selectItemRarity({
		lootTier: input.lootTier,
		availableRarities,
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
		rarity: rarityResult.value,
		rngState: rarityResult.rngState,
	});

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
