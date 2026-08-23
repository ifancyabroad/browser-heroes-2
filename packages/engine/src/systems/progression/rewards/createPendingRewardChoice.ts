import type { CombatState, HeroState, PendingRewardChoice } from "../../../schemas";
import { createContextRngState } from "../../../core/rng";
import type { ItemId } from "@app/content";

import { createRewardItemOptionInstanceId } from "../../../core/ids";
import { createRandomItemInstance } from "../../items/createRandomItemInstance";

const REWARD_GOLD_MULTIPLIER = 10;
const ITEM_REWARD_COUNT = 2;

type CreatePendingRewardChoiceInput = {
	runId: string;
	seed: string;
	hero: HeroState;
	zoneNumber: number;
	battleNumber: number;
	encounterType: CombatState["encounterType"];
	pendingRewardChoice: PendingRewardChoice | null;
};

type PendingRewardItemOption = Extract<PendingRewardChoice["options"][number], { type: "item" }>;

export function createPendingRewardChoice(
	input: CreatePendingRewardChoiceInput,
): PendingRewardChoice | null {
	if (input.pendingRewardChoice) {
		return input.pendingRewardChoice;
	}

	if (!grantsPendingRewardChoice(input.encounterType)) {
		return null;
	}

	const itemOptions: PendingRewardItemOption[] = [];
	const excludedLegendaryItemIds = new Set<ItemId>();

	while (itemOptions.length < ITEM_REWARD_COUNT) {
		const optionIndex = itemOptions.length;
		const itemResult = createRandomItemInstance({
			hero: input.hero,
			instanceId: createRewardItemOptionInstanceId(
				input.runId,
				input.battleNumber,
				optionIndex,
			),
			lootTier: input.zoneNumber,
			excludedLegendaryItemIds,
			rngState: createContextRngState(
				input.seed,
				"reward-item",
				input.battleNumber,
				optionIndex,
			),
		});

		itemOptions.push({
			type: "item",
			item: itemResult.value,
		});

		if (itemResult.value.type === "static") {
			excludedLegendaryItemIds.add(itemResult.value.itemId);
		}
	}

	if (itemOptions.length !== ITEM_REWARD_COUNT) {
		throw new Error("Unable to generate item reward options");
	}

	return {
		options: [
			itemOptions[0],
			itemOptions[1],
			{
				type: "gold",
				amount: input.battleNumber * REWARD_GOLD_MULTIPLIER,
			},
		],
	};
}

function grantsPendingRewardChoice(encounterType: CombatState["encounterType"]): boolean {
	return encounterType === "boss" || encounterType === "ghost";
}
