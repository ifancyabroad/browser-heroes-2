import type { EngineEvent, ItemInstance } from "../../schemas";
import { createItemEventPayload } from "./createItemEventPayload";

type ItemOfferEvent = Extract<EngineEvent, { type: "ITEM_OFFERED" }>;

export function createItemOfferEvents(input: {
	items: readonly ItemInstance[];
	source: ItemOfferEvent["source"];
	battleNumber: number;
}): ItemOfferEvent[] {
	return input.items.map((item) => ({
		type: "ITEM_OFFERED",
		item: createItemEventPayload(item),
		source: input.source,
		battleNumber: input.battleNumber,
	}));
}
