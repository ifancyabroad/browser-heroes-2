import { CLASSES_BY_ID, items, type Item, type ItemId } from "@app/content";

import type { HeroState } from "../../schemas";
import { canEquipItemLike } from "./canEquipItemLike";

type GetEligibleLegendaryItemsInput = {
	hero: HeroState;
	excludedItemIds: ReadonlySet<ItemId>;
};

export function getEligibleLegendaryItems(input: GetEligibleLegendaryItemsInput): Item[] {
	const classDefinition = CLASSES_BY_ID[input.hero.classId];

	const equippedItemIds = new Set(
		Object.values(input.hero.equipment).flatMap((item) => {
			if (!item || item.type !== "static") {
				return [];
			}

			return [item.itemId];
		}),
	);

	return items.filter((item) => {
		if (item.rarity !== "legendary") {
			return false;
		}

		if (equippedItemIds.has(item.id)) {
			return false;
		}

		if (input.excludedItemIds.has(item.id)) {
			return false;
		}

		return canEquipItemLike(classDefinition, item);
	});
}
