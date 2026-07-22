import { townStateSchema, type HeroState, type TownState } from "../schemas";
import type { RngResult, RngState } from "../core/rng";
import { calculateShopLevel } from "../systems/town/townPricing";
import { createTownShop } from "../systems/town/createTownShop";

type CreateTownStateInput = {
	runId: string;
	hero: HeroState;
	zoneNumber: number;
	battleNumber: number;
	rngState: RngState;
};

export function createTownState(input: CreateTownStateInput): RngResult<TownState> {
	const rerollCount = 0;
	const shopLevel = calculateShopLevel(input.zoneNumber);

	const shop = createTownShop({
		runId: input.runId,
		hero: input.hero,
		shopLevel,
		battleNumber: input.battleNumber,
		rerollCount,
		rngState: input.rngState,
	});

	const town: TownState = {
		shopSlots: shop.value,
		rerollCount,
		shopLevel,
	};

	return {
		value: townStateSchema.parse(town),
		rngState: shop.rngState,
	};
}
