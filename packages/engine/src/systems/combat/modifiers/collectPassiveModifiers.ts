import { FEATS_BY_ID, type FeatId } from "@app/content";

import type { HeroEquipmentState } from "../../../schemas";
import type { ResolvedModifier } from "./modifier.types";
import { getItemInstanceDefinition } from "../../items/getItemInstanceDefinition";

export function collectEquipmentModifiers(equipment: HeroEquipmentState): ResolvedModifier[] {
	return Object.values(equipment).flatMap((equippedItem): ResolvedModifier[] => {
		if (!equippedItem) {
			return [];
		}

		const itemDefinition = getItemInstanceDefinition(equippedItem);

		return itemDefinition.modifiers.map((modifier) => ({
			modifier,
			source: {
				type: "item",
				instanceId: equippedItem.instanceId,
				sourceName: itemDefinition.name,
				staticItemId: equippedItem.type === "static" ? equippedItem.itemId : undefined,
			},
		}));
	});
}

export function collectFeatModifiers(featIds: readonly FeatId[]): ResolvedModifier[] {
	return featIds.flatMap((featId): ResolvedModifier[] => {
		const feat = FEATS_BY_ID[featId];

		return feat.modifiers.map((modifier) => ({
			modifier,
			source: {
				type: "feat",
				featId,
				sourceName: feat.name,
			},
		}));
	});
}
