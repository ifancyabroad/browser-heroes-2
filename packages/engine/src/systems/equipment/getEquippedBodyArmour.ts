import { ITEMS_BY_ID, type Item, type ItemId } from "@app/content";

export type BodyArmour = Extract<Item, { type: "armour"; slot: "body" }>;

export function getEquippedBodyArmour(itemId: ItemId | undefined): BodyArmour | null {
	if (!itemId) {
		return null;
	}

	const item = ITEMS_BY_ID[itemId];

	return item?.type === "armour" && item.slot === "body" ? item : null;
}
