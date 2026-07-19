import type { EquippedItemState, RuntimeItem } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";

export type BodyArmour = Extract<RuntimeItem, { type: "armour"; slot: "body" }>;

export function getEquippedBodyArmour(
	equippedItem: EquippedItemState | null | undefined,
): BodyArmour | null {
	if (!equippedItem) {
		return null;
	}

	const item = getItemInstanceDefinition(equippedItem);

	return item.type === "armour" && item.slot === "body" ? item : null;
}
