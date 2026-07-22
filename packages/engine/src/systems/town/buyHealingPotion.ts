import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { MAX_HEALING_POTIONS } from "../consumables/healingPotionConstants";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { calculateHealingPotionCost } from "./townPricing";

export function buyHealingPotion(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	if (state.hero.healingPotions >= MAX_HEALING_POTIONS) {
		return failureResult(state, "HEALING_POTIONS_FULL");
	}

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const cost = calculateHealingPotionCost(effectiveCharisma, state.zoneNumber);

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const remainingPotions = state.hero.healingPotions + 1;

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
				cost,
				remainingPotions,
			},
		],
	);
}
