import type { EquippedItemState, RuntimeItem } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";

export type Shield = Extract<RuntimeItem, { type: "armour"; slot: "shield" }>;

export function getEquippedShield(
	equippedItem: EquippedItemState | null | undefined,
): Shield | null {
	if (!equippedItem) {
		return null;
	}

	const item = getItemInstanceDefinition(equippedItem);

	return item.type === "armour" && item.slot === "shield" ? item : null;
}
