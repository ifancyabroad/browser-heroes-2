import { ITEMS_BY_ID, type Item } from "@app/content";

import type { HeroEquipmentState } from "../../../schemas";

export function getEquippedItems(equipment: HeroEquipmentState): Item[] {
	return Object.values(equipment).flatMap((equipmentItem) => {
		if (!equipmentItem) {
			return [];
		}

		const item = ITEMS_BY_ID[equipmentItem.itemId];

		return item ? [item] : [];
	});
}
