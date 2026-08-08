import { items, type Item, type ItemId } from "@app/content";

import type { HeroState } from "../../schemas";
import { canHeroEquipItem } from "./canHeroEquipItem";

type GetEligibleLegendaryItemsInput = {
	hero: HeroState;
	excludedItemIds: ReadonlySet<ItemId>;
};

export function getEligibleLegendaryItems(input: GetEligibleLegendaryItemsInput): Item[] {
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

		return canHeroEquipItem(input.hero, item);
	});
}
