import { ITEMS_BY_ID, type EquipmentSlot, type Item } from "@app/content";

import type { RewardOption, RunState } from "../schemas";
import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";

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
			validEquipmentSlots: EquipmentSlot[];
			requiresEquipmentSlotSelection: boolean;
	  };

export type RewardChoiceView = {
	options: RewardChoiceOptionView[];
};

export function selectRewardChoiceView(state: RunState): RewardChoiceView | null {
	const pendingRewardChoice = state.pendingRewardChoice;

	if (!pendingRewardChoice) {
		return null;
	}

	return {
		options: pendingRewardChoice.options.flatMap(
			(option, optionIndex): RewardChoiceOptionView[] =>
				createRewardOptionView(option, optionIndex),
		),
	};
}

function createRewardOptionView(
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
			validEquipmentSlots,
			requiresEquipmentSlotSelection: validEquipmentSlots.length > 1,
		},
	];
}
