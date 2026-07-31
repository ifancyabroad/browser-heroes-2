import type { ItemId, ItemRarity } from "@app/content";

import type { ItemInstance } from "../../schemas";
import { getItemInstanceDefinition } from "./getItemInstanceDefinition";

export type ItemEventPayload = {
	itemInstanceId: string;
	itemName: string;
	rarity: ItemRarity;
	staticItemId?: ItemId;
};

export function createItemEventPayload(instance: ItemInstance): ItemEventPayload | null {
	const item = getItemInstanceDefinition(instance);

	return {
		itemInstanceId: instance.instanceId,
		itemName: item.name,
		rarity: item.rarity,
		staticItemId: instance.type === "static" ? instance.itemId : undefined,
	};
}
