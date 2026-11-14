import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { MAX_HEALING_POTIONS } from "../consumables/healingPotionConstants";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { calculateHealingPotionCost } from "./townPricing";

export function buyHealingPotion(state: RunState, quantity: number): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	if (!Number.isSafeInteger(quantity) || quantity < 1) {
		return failureResult(state, "INVALID_ACTION");
	}

	if (quantity > MAX_HEALING_POTIONS - state.hero.healingPotions) {
		return failureResult(state, "HEALING_POTIONS_FULL");
	}

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const cost = calculateHealingPotionCost(effectiveCharisma, state.zoneNumber) * quantity;

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const remainingPotions = state.hero.healingPotions + quantity;

	return successResult(
		{
			...state,
			gold: state.gold - cost,
			hero: {
				...state.hero,
				healingPotions: remainingPotions,
			},
		},
		[
			{
				type: "HEALING_POTION_BOUGHT",
				quantity,
				cost,
				remainingPotions,
			},
		],
	);
}
