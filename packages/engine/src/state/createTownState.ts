import { townStateSchema, type HeroState, type TownShopSlot, type TownState } from "../schemas";
import { calculateShopLevel } from "../systems/town/townPricing";
import { createTownShop } from "../systems/town/createTownShop";

type CreateTownStateInput = {
	runId: string;
	seed: string;
	hero: HeroState;
	zoneNumber: number;
	battleNumber: number;
	shopLocks: readonly TownShopSlot[];
};

export function createTownState(input: CreateTownStateInput): TownState {
	const rerollCount = 0;
	const shopLevel = calculateShopLevel(input.zoneNumber);

	const shop = createTownShop({
		runId: input.runId,
		seed: input.seed,
		hero: input.hero,
		shopLevel,
		battleNumber: input.battleNumber,
		rerollCount,
		preservedSlots: input.shopLocks,
	});

	const town: TownState = {
		shopSlots: shop,
		rerollCount,
		shopLevel,
	};

	return townStateSchema.parse(town);
}
