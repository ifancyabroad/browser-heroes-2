import { ITEMS_BY_ID, type EquipmentSlot, type Item } from "@app/content";

import type { EquippedItemState, RewardOption, RunState } from "../schemas";

import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { previewEquipItem } from "../systems/equipment/previewEquipItem";

export type RewardItemDestinationView = {
	equipmentSlot: EquipmentSlot;
	replacedItems: readonly EquippedItemState[];
};

export type RewardChoiceOptionView =
	| {
			type: "gold";
			optionIndex: number;
			amount: number;
	  }
	| {
			type: "item";
			optionIndex: number;
			item: Item;
			destinations: readonly RewardItemDestinationView[];
			requiresEquipmentSlotSelection: boolean;
	  };

export type RewardChoiceView = {
	options: readonly RewardChoiceOptionView[];
};

export function selectRewardChoiceView(state: RunState): RewardChoiceView | null {
	const pendingRewardChoice = state.pendingRewardChoice;

	if (!pendingRewardChoice) {
		return null;
	}

	return {
		options: pendingRewardChoice.options.flatMap((option, optionIndex) =>
			createRewardOptionView(state, option, optionIndex),
		),
	};
}

function createRewardOptionView(
	state: RunState,
	option: RewardOption,
	optionIndex: number,
): RewardChoiceOptionView[] {
	if (option.type === "gold") {
		return [
			{
				type: "gold",
				optionIndex,
				amount: option.amount,
			},
		];
	}

	const item = ITEMS_BY_ID[option.itemId];

	if (!item) {
		return [];
	}

	const validEquipmentSlots = getValidEquipmentSlots(item);

	return [
		{
			type: "item",
			optionIndex,
			item,
			destinations: validEquipmentSlots.flatMap((equipmentSlot) => {
				const preview = previewEquipItem({
					hero: state.hero,
					item,
					requestedSlot: equipmentSlot,
				});

				if (!preview.ok) {
					return [];
				}

				return [
					{
						equipmentSlot: preview.equipmentSlot,
						replacedItems: preview.replacedItems,
					},
				];
			}),
			requiresEquipmentSlotSelection: validEquipmentSlots.length > 1,
		},
	];
}
