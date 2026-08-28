import type { EngineResult, RunState, TownState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createTownShop } from "./createTownShop";
import { calculateRerollCost } from "./townPricing";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { createItemOfferEvents } from "../items/createItemOfferEvents";

export function rerollShop(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const cost = calculateRerollCost(
		effectiveCharisma,
		state.town.shopLevel,
		state.town.rerollCount,
	);

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const rerollCount = state.town.rerollCount + 1;

	const shop = createTownShop({
		runId: state.id,
		seed: state.seed,
		hero: state.hero,
		shopLevel: state.town.shopLevel,
		battleNumber: state.battleNumber,
		rerollCount: rerollCount,
		preservedSlots: state.shopLocks,
	});

	const town: TownState = {
		...state.town,
		shopSlots: shop,
		rerollCount,
	};

	return successResult(
		{
			...state,
			gold: state.gold - cost,
			town,
		},
		[
			{
				type: "SHOP_REROLLED",
				cost,
			},
			...createItemOfferEvents({
				items: shop.map((slot) => slot.item),
				source: "shop",
				battleNumber: state.battleNumber,
			}),
		],
	);
}
