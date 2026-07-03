import { ITEMS_BY_ID } from "@app/content";

import type { EngineResult, SelectRewardAction, RunState } from "../../../schemas";

import { createRewardItemInstanceId } from "../../../core/ids";
import { failureResult, successResult } from "../../../core/result";
import { equipItem } from "../../equipment/equipItem";

export function completeRewardChoice(state: RunState, action: SelectRewardAction): EngineResult {
	const pendingRewardChoice = state.pendingRewardChoice;

	if (!pendingRewardChoice) {
		return failureResult(state, "REWARD_NOT_AVAILABLE");
	}

	const option = pendingRewardChoice.options[action.selection.optionIndex];

	if (!option) {
		return failureResult(state, "INVALID_REWARD_SELECTION");
	}

	if (option.type === "gold") {
		if (action.selection.equipmentSlot !== undefined) {
			return failureResult(state, "INVALID_REWARD_SELECTION");
		}

		return successResult(
			{
				...state,
				gold: state.gold + option.amount,
				pendingRewardChoice: null,
			},
			[
				{
					type: "REWARD_SELECTED",
					rewardType: "gold",
					amount: option.amount,
				},
			],
		);
	}

	const item = ITEMS_BY_ID[option.itemId];

	if (!item) {
		return failureResult(state, "INVALID_REWARD_SELECTION");
	}

	const equipResult = equipItem({
		hero: state.hero,
		item,
		instanceId: createRewardItemInstanceId(state.id, state.battleNumber, item.id),
		requestedSlot: action.selection.equipmentSlot,
	});

	if (!equipResult.ok) {
		return failureResult(state, equipResult.error);
	}

	return successResult(
		{
			...state,
			hero: equipResult.hero,
			pendingRewardChoice: null,
		},
		[
			{
				type: "REWARD_SELECTED",
				rewardType: "item",
				itemId: item.id,
				equipmentSlot: equipResult.equipmentSlot,
			},
		],
	);
}
