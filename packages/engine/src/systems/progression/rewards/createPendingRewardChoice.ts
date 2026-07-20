import type { CombatState, HeroState, PendingRewardChoice } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import type { ItemId } from "@app/content";

import { createRewardItemOptionInstanceId } from "../../../core/ids";
import { createRandomItemInstance } from "../../items/createRandomItemInstance";

const REWARD_GOLD_MULTIPLIER = 10;
const ITEM_REWARD_COUNT = 2;

type CreatePendingRewardChoiceInput = {
	runId: string;
	hero: HeroState;
	zoneNumber: number;
	battleNumber: number;
	encounterType: CombatState["encounterType"];
	pendingRewardChoice: PendingRewardChoice | null;
	rngState: RngState;
};

type PendingRewardItemOption = Extract<PendingRewardChoice["options"][number], { type: "item" }>;

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

	const itemOptions: PendingRewardItemOption[] = [];
	const excludedLegendaryItemIds = new Set<ItemId>();
	let rngState = input.rngState;

	while (itemOptions.length < ITEM_REWARD_COUNT) {
		const itemResult = createRandomItemInstance({
			hero: input.hero,
			instanceId: createRewardItemOptionInstanceId(
				input.runId,
				input.battleNumber,
				itemOptions.length,
			),
			lootTier: input.zoneNumber,
			excludedLegendaryItemIds,
			rngState,
		});

		if (!itemResult) {
			throw new Error("Unable to generate item reward option");
		}

		itemOptions.push({
			type: "item",
			item: itemResult.value,
		});

		if (itemResult.value.type === "static") {
			excludedLegendaryItemIds.add(itemResult.value.itemId);
		}

		rngState = itemResult.rngState;
	}

	if (itemOptions.length !== ITEM_REWARD_COUNT) {
		throw new Error("Unable to generate item reward options");
	}

	return {
		value: {
			options: [
				itemOptions[0],
				itemOptions[1],
				{
					type: "gold",
					amount: input.battleNumber * REWARD_GOLD_MULTIPLIER,
				},
			],
		},
		rngState,
	};
}

function grantsPendingRewardChoice(encounterType: CombatState["encounterType"]): boolean {
	return encounterType === "boss" || encounterType === "ghost";
}
