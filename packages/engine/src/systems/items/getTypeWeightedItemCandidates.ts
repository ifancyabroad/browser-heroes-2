import type { Item, ItemBase } from "@app/content";

import { ITEM_TYPE_WEIGHTS, type ItemGenerationType } from "./itemGenerationWeights";

type ItemLike = Item | ItemBase;

type WeightedItemCandidate<T> = {
	value: T;
	weight: number;
};

export function getTypeWeightedItemCandidates<T extends ItemLike>(
	items: readonly T[],
): WeightedItemCandidate<T>[] {
	const itemTypeCounts = new Map<ItemGenerationType, number>();

	for (const item of items) {
		const itemType = getItemGenerationType(item);

		itemTypeCounts.set(itemType, (itemTypeCounts.get(itemType) ?? 0) + 1);
	}

	return items.map((item) => {
		const itemType = getItemGenerationType(item);
		const itemCount = itemTypeCounts.get(itemType);

		if (!itemCount) {
			throw new Error(`Missing item count for generation type: ${itemType}`);
		}

		return {
			value: item,
			weight: ITEM_TYPE_WEIGHTS[itemType] / itemCount,
		};
	});
}

function getItemGenerationType(item: ItemLike): ItemGenerationType {
	if (item.type === "weapon") {
		return "weapon";
	}

	return item.slot;
}
