import type { EngineResult, RunState, TownState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createTownShop } from "./createTownShop";
import { calculateRestockCost } from "./townPricing";

export function rerollShop(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const cost = state.town.rerollCost;

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const restockCount = state.town.restockCount + 1;

	const shop = createTownShop({
		runId: state.id,
		hero: state.hero,
		shopLevel: state.town.shopLevel,
		rngState: state.rngState,
	});

	const town: TownState = {
		...state.town,
		shopSlots: shop.value,
		restockCount,
		rerollCost: calculateRestockCost(state.hero, restockCount),
	};

	return successResult(
		{
			...state,
			rngState: shop.rngState,
			gold: state.gold - cost,
			town,
		},
		[
			{
				type: "SHOP_REROLLED",
				cost,
			},
		],
	);
}
