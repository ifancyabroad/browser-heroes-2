import type { HeroEquipmentState, RuntimeItem } from "../../schemas";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";

export function getEquippedItems(equipment: HeroEquipmentState): RuntimeItem[] {
	return Object.values(equipment).flatMap((equipmentItem) => {
		if (!equipmentItem) {
			return [];
		}

		return [getItemInstanceDefinition(equipmentItem)];
	});
}
