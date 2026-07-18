import type { ItemId } from "@app/content";

import type { ItemInstance } from "../../schemas";
import { randomFloat, type RngState, type RngResult } from "../../core/rng";
import { createGeneratedItemInstance } from "./createGeneratedItemInstance";
import { selectItemBase } from "./selectItemBase";
import { selectWeightedEquipmentItem } from "./selectWeightedEquipmentItem";
import type { HeroState } from "../../schemas";

const DEFAULT_GENERATED_ITEM_CHANCE = 0.7;

type CreateRandomItemInstanceInput = {
	hero: HeroState;
	instanceId: string;
	itemLevel: number;
	rngState: RngState;
	excludedStaticItemIds: ReadonlySet<ItemId>;
	generatedItemChance?: number;
};

type CreateRandomItemInstanceValue = {
	item: ItemInstance;
	staticItemId: ItemId | null;
};

export function createRandomItemInstance(
	input: CreateRandomItemInstanceInput,
): RngResult<CreateRandomItemInstanceValue> | null {
	const generatedItemChance = input.generatedItemChance ?? DEFAULT_GENERATED_ITEM_CHANCE;
	const sourceRoll = randomFloat(input.rngState);

	if (sourceRoll.value < generatedItemChance) {
		const baseResult = selectItemBase({
			hero: input.hero,
			level: input.itemLevel,
			rngState: sourceRoll.rngState,
		});

		if (!baseResult.ok) {
			return null;
		}

		const generatedItemResult = createGeneratedItemInstance({
			instanceId: input.instanceId,
			base: baseResult.value,
			level: input.itemLevel,
			rngState: baseResult.rngState,
		});

		return {
			value: {
				item: generatedItemResult.value,
				staticItemId: null,
			},
			rngState: generatedItemResult.rngState,
		};
	}

	const staticItemResult = selectWeightedEquipmentItem({
		hero: input.hero,
		itemLevel: input.itemLevel,
		excludedItemIds: input.excludedStaticItemIds,
		rngState: sourceRoll.rngState,
	});

	if (!staticItemResult) {
		return null;
	}

	return {
		value: {
			item: {
				instanceId: input.instanceId,
				type: "static",
				itemId: staticItemResult.value.id,
			},
			staticItemId: staticItemResult.value.id,
		},
		rngState: staticItemResult.rngState,
	};
}
