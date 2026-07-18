import { ITEMS_BY_ID } from "@app/content";

import type { ItemInstance, RuntimeItem } from "../../schemas";

export function getItemInstanceDefinition(
	instance: ItemInstance | null | undefined,
): RuntimeItem | null {
	if (!instance) {
		return null;
	}

	switch (instance.type) {
		case "static":
			return ITEMS_BY_ID[instance.itemId] ?? null;

		case "generated":
			return instance.item;
	}
}
