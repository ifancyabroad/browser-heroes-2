import { townStateSchema, type HeroState, type TownState } from "../schemas";
import type { RngResult, RngState } from "../core/rng";
import {
	calculateRestCost,
	calculateRerollCost,
	calculateShopLevel,
} from "../systems/town/townPricing";
import { createTownShop } from "../systems/town/createTownShop";

type CreateTownStateInput = {
	runId: string;
	hero: HeroState;
	battleNumber: number;
	rngState: RngState;
};

export function createTownState(input: CreateTownStateInput): RngResult<TownState> {
	const rerollCount = 0;
	const restCount = 0;
	const shopLevel = calculateShopLevel(input.battleNumber);

	const shop = createTownShop({
		runId: input.runId,
		hero: input.hero,
		shopLevel,
		rngState: input.rngState,
	});

	const town: TownState = {
		shopSlots: shop.value,
		rerollCount,
		restCount,
		shopLevel,
		rerollCost: calculateRerollCost(input.hero, rerollCount),
		restCost: calculateRestCost(input.hero, restCount),
	};

	return {
		value: townStateSchema.parse(town),
		rngState: shop.rngState,
	};
}
