import type { EngineResult, RunState, TownState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { createTownShop } from "./createTownShop";
import { calculateRerollCost } from "./townPricing";
import { deriveHeroStats } from "../hero/deriveHeroStats";

export function rerollShop(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const cost = calculateRerollCost(effectiveCharisma, state.town.rerollCount);

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const rerollCount = state.town.rerollCount + 1;

	const shop = createTownShop({
		runId: state.id,
		hero: state.hero,
		shopLevel: state.town.shopLevel,
		battleNumber: state.battleNumber,
		rerollCount: rerollCount,
		rngState: state.rngState,
	});

	const town: TownState = {
		...state.town,
		shopSlots: shop.value,
		rerollCount,
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
