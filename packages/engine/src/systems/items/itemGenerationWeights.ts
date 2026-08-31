import type { ArmourSlot, ItemRarity } from "@app/content";

export type ItemGenerationType = "weapon" | ArmourSlot;

export const ITEM_RARITY_WEIGHTS_BY_LOOT_TIER: readonly Record<ItemRarity, number>[] = [
	{
		common: 0.59,
		uncommon: 0.3,
		rare: 0.1,
		epic: 0.01,
		legendary: 0,
	},
	{
		common: 0.39,
		uncommon: 0.44,
		rare: 0.15,
		epic: 0.018,
		legendary: 0.002,
	},
	{
		common: 0.19,
		uncommon: 0.58,
		rare: 0.2,
		epic: 0.027,
		legendary: 0.003,
	},
	{
		common: 0,
		uncommon: 0.71,
		rare: 0.25,
		epic: 0.036,
		legendary: 0.004,
	},
	{
		common: 0,
		uncommon: 0.65,
		rare: 0.3,
		epic: 0.045,
		legendary: 0.005,
	},
	{
		common: 0,
		uncommon: 0.59,
		rare: 0.35,
		epic: 0.054,
		legendary: 0.006,
	},
	{
		common: 0,
		uncommon: 0.53,
		rare: 0.4,
		epic: 0.063,
		legendary: 0.007,
	},
	{
		common: 0,
		uncommon: 0.47,
		rare: 0.45,
		epic: 0.072,
		legendary: 0.008,
	},
	{
		common: 0,
		uncommon: 0.41,
		rare: 0.5,
		epic: 0.081,
		legendary: 0.009,
	},
	{
		common: 0,
		uncommon: 0.35,
		rare: 0.55,
		epic: 0.09,
		legendary: 0.01,
	},
];

export const ITEM_TYPE_WEIGHTS: Record<ItemGenerationType, number> = {
	weapon: 0.2,
	body: 0.1,
	shield: 0.1,
	helmet: 0.1,
	gloves: 0.1,
	boots: 0.1,
	belt: 0.1,
	amulet: 0.1,
	ring: 0.1,
};
