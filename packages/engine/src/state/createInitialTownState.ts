import { townStateSchema, type TownState } from "../schemas";

export function createInitialTownState(): TownState {
	const town: TownState = {
		shopSlots: [],
		rerollCost: 5,
	};

	return townStateSchema.parse(town);
}
