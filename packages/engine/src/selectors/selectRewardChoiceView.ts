import type { RewardOption, RunState, RuntimeItem } from "../schemas";

import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";
import { type EquipmentPlacementView, selectEquipmentPlacement } from "./selectEquipmentPlacement";

export type RewardChoiceOptionView =
	| {
			type: "gold";
			optionIndex: number;
			amount: number;
	  }
	| {
			type: "item";
			optionIndex: number;
			item: RuntimeItem;
			equipmentPlacement: EquipmentPlacementView;
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

	const item = getItemInstanceDefinition(option.item);

	const equipmentPlacement = selectEquipmentPlacement(state.hero, item);

	return [
		{
			type: "item",
			optionIndex,
			item,
			equipmentPlacement,
		},
	];
}
