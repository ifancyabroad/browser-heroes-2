import type { Rarity } from "@app/content";

export type SkillLevelUpChoice = {
	type: "skill";
	rarityWeights: Partial<Record<Rarity, number>>;
};

export type LevelUpChoice = SkillLevelUpChoice | { type: "feat" };

export type LevelProgressionEntry = {
	level: number;
	requiredXp: number;
	choice?: LevelUpChoice;
};

export const LEVEL_PROGRESSION = [
	{
		level: 1,
		requiredXp: 0,
	},
	{
		level: 2,
		requiredXp: 50,
		choice: { type: "feat" },
	},
	{
		level: 3,
		requiredXp: 1_000,
		choice: { type: "skill", rarityWeights: { common: 3, uncommon: 1 } },
	},
	{
		level: 4,
		requiredXp: 5_000,
	},
	{
		level: 5,
		requiredXp: 12_000,
		choice: { type: "skill", rarityWeights: { uncommon: 3, rare: 1 } },
	},
	{
		level: 6,
		requiredXp: 20_000,
		choice: { type: "feat" },
	},
	{
		level: 7,
		requiredXp: 35_000,
		choice: { type: "skill", rarityWeights: { rare: 3, epic: 1 } },
	},
	{
		level: 8,
		requiredXp: 55_000,
	},
	{
		level: 9,
		requiredXp: 80_000,
		choice: { type: "skill", rarityWeights: { epic: 3, legendary: 1 } },
	},
	{
		level: 10,
		requiredXp: 100_000,
		choice: { type: "feat" },
	},
] as const satisfies readonly LevelProgressionEntry[];

export const MAX_HERO_LEVEL = LEVEL_PROGRESSION[LEVEL_PROGRESSION.length - 1].level;
