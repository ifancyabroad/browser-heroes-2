import { ITEMS_BY_ID } from "@app/content";

import type { ItemInstance, RuntimeItem } from "../../schemas";

export function getItemInstanceDefinition(instance: ItemInstance): RuntimeItem {
	switch (instance.type) {
		case "static":
			return ITEMS_BY_ID[instance.itemId];

		case "generated":
			return instance.item;
	}
}
