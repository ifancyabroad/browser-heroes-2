import { FEATS_BY_ID, ITEMS_BY_ID, type FeatId } from "@app/content";

import type { HeroEquipmentState } from "../../../schemas";
import type { ResolvedModifier } from "./modifier.types";

export function collectEquipmentModifiers(equipment: HeroEquipmentState): ResolvedModifier[] {
	return Object.values(equipment).flatMap((equippedItem): ResolvedModifier[] => {
		if (!equippedItem) {
			return [];
		}

		const itemDefinition = ITEMS_BY_ID[equippedItem.itemId];

		return itemDefinition.modifiers.map((modifier) => ({
			modifier,
			source: {
				type: "item",
				itemId: equippedItem.itemId,
				instanceId: equippedItem.instanceId,
			},
		}));
	});
}

export function collectFeatModifiers(featIds: readonly FeatId[]): ResolvedModifier[] {
	return featIds.flatMap((featId): ResolvedModifier[] =>
		FEATS_BY_ID[featId].modifiers.map((modifier) => ({
			modifier,
			source: {
				type: "feat",
				featId,
			},
		})),
	);
}
