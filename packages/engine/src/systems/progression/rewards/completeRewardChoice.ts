import type { EngineResult, RunState, SelectRewardAction } from "../../../schemas";

import { failureResult, successResult } from "../../../core/result";
import { equipItem } from "../../equipment/equipItem";
import { createItemEventPayload } from "../../items/createItemEventPayload";
import { refreshCompletedCombatPlayer } from "../../combat/combatants/refreshCompletedCombatPlayer";

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

	const eventItem = createItemEventPayload(option.item);

	if (!eventItem) {
		return failureResult(state, "INVALID_REWARD_SELECTION");
	}

	const equipResult = equipItem({
		hero: state.hero,
		item: option.item,
		requestedSlot: action.selection.equipmentSlot,
	});

	if (!equipResult.ok) {
		return failureResult(state, equipResult.error);
	}

	return successResult(
		{
			...state,
			hero: equipResult.hero,
			combat: refreshCompletedCombatPlayer(state.combat, equipResult.hero),
			pendingRewardChoice: null,
		},
		[
			{
				type: "REWARD_SELECTED",
				rewardType: "item",
				item: eventItem,
				equipmentSlot: equipResult.equipmentSlot,
			},
		],
	);
}
