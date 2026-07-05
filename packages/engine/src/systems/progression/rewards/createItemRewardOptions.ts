import type { Item, ItemId } from "@app/content";

import type { RngResult, RngState } from "../../../core/rng";
import type { HeroState } from "../../../schemas";
import { selectWeightedEquipmentItem } from "../../items/selectWeightedEquipmentItem";

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
		const selected = selectWeightedEquipmentItem({
			hero,
			itemLevel: zoneNumber,
			excludedItemIds,
			rngState: nextRngState,
		});

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
