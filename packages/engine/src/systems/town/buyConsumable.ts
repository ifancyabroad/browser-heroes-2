import { CONSUMABLES_BY_ID } from "@app/content";
import type { BuyConsumableAction, EngineResult, RunState } from "../../schemas";
import { failureResult, successResult } from "../../core/result";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { calculateConsumableCost } from "./townPricing";

export function buyConsumable(state: RunState, action: BuyConsumableAction): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const { consumableType, quantity } = action;
	if (!Object.hasOwn(CONSUMABLES_BY_ID, consumableType)) {
		return failureResult(state, "CONSUMABLE_NOT_AVAILABLE");
	}
	if (!Number.isSafeInteger(quantity) || quantity < 1) {
		return failureResult(state, "INVALID_ACTION");
	}

	const definition = CONSUMABLES_BY_ID[consumableType];
	const currentQuantity = state.hero.consumables[consumableType];
	if (quantity > definition.maxCarry - currentQuantity) {
		return failureResult(state, "HEALING_POTIONS_FULL");
	}

	const charisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;
	const cost = calculateConsumableCost(consumableType, charisma, state.zoneNumber) * quantity;
	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const remainingQuantity = currentQuantity + quantity;
	return successResult(
		{
			...state,
			gold: state.gold - cost,
			hero: {
				...state.hero,
				consumables: { ...state.hero.consumables, [consumableType]: remainingQuantity },
			},
		},
		[{ type: "HEALING_POTION_BOUGHT", quantity, cost, remainingPotions: remainingQuantity }],
	);
}
