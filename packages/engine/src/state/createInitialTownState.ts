import { townStateSchema, type HeroState, type TownState } from "../schemas";
import type { RngResult, RngState } from "../core/rng";
import {
	calculateRestCost,
	calculateRestockCost,
	calculateShopLevel,
} from "../systems/town/townPricing";
import { createTownShop } from "../systems/town/createTownShop";

type CreateInitialTownStateInput = {
	runId: string;
	hero: HeroState;
	battleNumber: number;
	rngState: RngState;
};

export function createInitialTownState(input: CreateInitialTownStateInput): RngResult<TownState> {
	const restockCount = 0;
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
		restockCount,
		restCount,
		shopLevel,
		rerollCost: calculateRestockCost(input.hero, restockCount),
		restCost: calculateRestCost(input.hero, restCount),
	};

	return {
		value: townStateSchema.parse(town),
		rngState: shop.rngState,
	};
}
