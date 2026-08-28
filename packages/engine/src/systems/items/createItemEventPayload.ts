import type { ItemRarity } from "@app/content";

import type { ItemInstance } from "../../schemas";
import { getItemInstanceDefinition } from "./getItemInstanceDefinition";

export type ItemEventPayload = {
	itemInstanceId: string;
	itemId: string;
	itemName: string;
	rarity: ItemRarity;
};

export function createItemEventPayload(instance: ItemInstance): ItemEventPayload {
	const item = getItemInstanceDefinition(instance);

	return {
		itemInstanceId: instance.instanceId,
		itemId: item.id,
		itemName: item.name,
		rarity: item.rarity,
	};
}
