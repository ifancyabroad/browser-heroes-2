import type { EquipmentSlot } from "@app/content";

import type { EquippedItemState, HeroState, RuntimeItem } from "../schemas";
import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { previewEquipItem } from "../systems/equipment/previewEquipItem";

export type EquipmentDestinationView = {
	equipmentSlot: EquipmentSlot;
	replacedItems: readonly EquippedItemState[];
};

export type EquipmentPlacementView = {
	destinations: readonly EquipmentDestinationView[];
	automaticDestination: EquipmentDestinationView | null;
};

export function selectEquipmentPlacement(
	hero: HeroState,
	item: RuntimeItem,
): EquipmentPlacementView {
	const destinations = getValidEquipmentSlots(item).flatMap((equipmentSlot) => {
		const preview = previewEquipItem({ hero, item, requestedSlot: equipmentSlot });

		return preview.ok
			? [{ equipmentSlot: preview.equipmentSlot, replacedItems: preview.replacedItems }]
			: [];
	});

	const automaticDestination = destinations.find(hasNoReplacedItems) ?? null;

	return {
		destinations,
		automaticDestination,
	};
}

function hasNoReplacedItems(destination: EquipmentDestinationView): boolean {
	return destination.replacedItems.length === 0;
}
