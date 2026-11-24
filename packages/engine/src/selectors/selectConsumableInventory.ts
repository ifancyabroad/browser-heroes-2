import { consumables, type ConsumableId } from "@app/content";
import type { HeroState } from "../schemas";

export type ConsumableView = {
	name: string;
	quantity: number;
	maxCarry: number;
};

export type ConsumableInventoryView = Record<ConsumableId, ConsumableView>;

export function selectConsumableInventory(hero: HeroState): ConsumableInventoryView {
	return Object.fromEntries(
		consumables.map((definition) => [
			definition.id,
			{
				name: definition.name,
				quantity: hero.consumables[definition.id],
				maxCarry: definition.maxCarry,
			},
		]),
	) as ConsumableInventoryView;
}
