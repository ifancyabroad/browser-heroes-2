import type { ItemId } from "@app/content";

import type { ItemInstance } from "../../schemas";
import { getItemInstanceDefinition } from "./getItemInstanceDefinition";

export type ItemEventPayload = {
	itemInstanceId: string;
	itemName: string;
	staticItemId?: ItemId;
};

export function createItemEventPayload(instance: ItemInstance): ItemEventPayload | null {
	const item = getItemInstanceDefinition(instance);

	if (!item) {
		return null;
	}

	return {
		itemInstanceId: instance.instanceId,
		itemName: item.name,
		staticItemId: instance.type === "static" ? instance.itemId : undefined,
	};
}
