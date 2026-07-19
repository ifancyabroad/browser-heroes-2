import type { Weapon } from "@app/content";

import type { EquippedItemState } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";

export function getEquippedWeapon(
	equippedItem: EquippedItemState | null | undefined,
): Weapon | null {
	if (!equippedItem) {
		return null;
	}

	const item = getItemInstanceDefinition(equippedItem);

	return item.type === "weapon" ? item : null;
}
