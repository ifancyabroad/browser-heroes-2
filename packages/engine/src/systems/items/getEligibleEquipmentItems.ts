import { CLASSES_BY_ID, items, type Item, type ItemId, type ItemRarity } from "@app/content";

import type { HeroState } from "../../schemas";
import type { ItemGenerationType } from "./itemGenerationWeights";
import { canEquipItemLike } from "./canEquipItemLike";

type GetEligibleEquipmentItemsInput = {
	hero: HeroState;
	itemType: ItemGenerationType;
	rarity: ItemRarity;
	excludedItemIds?: ReadonlySet<ItemId>;
};

export function getEligibleEquipmentItems(input: GetEligibleEquipmentItemsInput): Item[] {
	const classDefinition = CLASSES_BY_ID[input.hero.classId];

	const equippedStaticItemIds = new Set(
		Object.values(input.hero.equipment).flatMap((item) => {
			if (!item || item.type !== "static") {
				return [];
			}

			return [item.itemId];
		}),
	);

	return items.filter((item) => {
		if (equippedStaticItemIds.has(item.id)) {
			return false;
		}

		if (input.excludedItemIds?.has(item.id)) {
			return false;
		}

		if (item.rarity !== input.rarity) {
			return false;
		}

		if (!matchesItemGenerationType(item, input.itemType)) {
			return false;
		}

		return canEquipItemLike(classDefinition, item);
	});
}

function matchesItemGenerationType(item: Item, itemType: ItemGenerationType): boolean {
	if (itemType === "weapon") {
		return item.type === "weapon";
	}

	return item.type === "armour" && item.slot === itemType;
}
