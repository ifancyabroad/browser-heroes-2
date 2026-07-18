import type { CombatState, HeroState, PendingRewardChoice } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { createItemRewardOptions } from "./createItemRewardOptions";

import { createRewardItemInstanceId } from "../../../core/ids";

const REWARD_GOLD_MULTIPLIER = 10;

type CreatePendingRewardChoiceInput = {
	runId: string;
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

	if (!grantsPendingRewardChoice(input.encounterType)) {
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
					item: {
						instanceId: createRewardItemInstanceId(
							input.runId,
							input.battleNumber,
							itemOptions.value[0].id,
						),
						type: "static",
						itemId: itemOptions.value[0].id,
					},
				},
				{
					type: "item",
					item: {
						instanceId: createRewardItemInstanceId(
							input.runId,
							input.battleNumber,
							itemOptions.value[1].id,
						),
						type: "static",
						itemId: itemOptions.value[1].id,
					},
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

function grantsPendingRewardChoice(encounterType: CombatState["encounterType"]): boolean {
	return encounterType === "boss" || encounterType === "ghost";
}
