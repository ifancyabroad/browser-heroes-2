import type { EngineResult, RunState, TownState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { calculateRestCost } from "./townPricing";

export function restAtTown(state: RunState): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const cost = state.town.restCost;

	if (state.gold < cost) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const hpRestored = Math.max(0, state.hero.maxHp - state.hero.currentHp);
	const restCount = state.town.restCount + 1;

	const town: TownState = {
		...state.town,
		restCount,
		restCost: calculateRestCost(state.hero, restCount),
	};

	return successResult(
		{
			...state,
			gold: state.gold - cost,
			hero: {
				...state.hero,
				currentHp: state.hero.maxHp,
			},
			town,
		},
		[
			{
				type: "RESTED_AT_TOWN",
				cost,
				hpRestored,
			},
		],
	);
}
