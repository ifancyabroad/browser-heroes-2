import type { CombatState, HeroState, PendingRewardChoice } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { createItemRewardOptions } from "./createItemRewardOptions";
import { REWARD_GOLD_MULTIPLIER } from "./rewardConstants";

type CreatePendingRewardChoiceInput = {
	hero: HeroState;
	zoneNumber: number;
	battleNumber: number;
	encounterType: CombatState["encounterType"];
	pendingRewardChoice: PendingRewardChoice | null;
	rngState: RngState;
};

export function createPendingRewardChoice(
	input: CreatePendingRewardChoiceInput,
): RngResult<PendingRewardChoice | null> {
	if (input.pendingRewardChoice) {
		return {
			value: input.pendingRewardChoice,
			rngState: input.rngState,
		};
	}

	if (input.encounterType !== "boss") {
		return {
			value: null,
			rngState: input.rngState,
		};
	}

	const itemOptions = createItemRewardOptions(input.hero, input.zoneNumber, input.rngState);

	return {
		value: {
			options: [
				{
					type: "item",
					itemId: itemOptions.value[0].id,
				},
				{
					type: "item",
					itemId: itemOptions.value[1].id,
				},
				{
					type: "gold",
					amount: input.battleNumber * REWARD_GOLD_MULTIPLIER,
				},
			],
		},
		rngState: itemOptions.rngState,
	};
}
