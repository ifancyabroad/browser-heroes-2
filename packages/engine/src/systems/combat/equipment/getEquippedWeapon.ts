import { ITEMS_BY_ID, type ItemId, type Weapon } from "@app/content";

export function getEquippedWeapon(itemId: ItemId | undefined): Weapon | null {
	if (!itemId) {
		return null;
	}

	const item = ITEMS_BY_ID[itemId];

	return item?.type === "weapon" ? item : null;
}
