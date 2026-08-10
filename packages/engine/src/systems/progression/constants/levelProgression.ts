export type LevelUpChoiceType = "skill" | "feat";

export type LevelProgressionEntry = {
	level: number;
	requiredXp: number;
	choice?: LevelUpChoiceType;
};

export const LEVEL_PROGRESSION = [
	{
		level: 1,
		requiredXp: 0,
	},
	{
		level: 2,
		requiredXp: 50,
		choice: "feat",
	},
	{
		level: 3,
		requiredXp: 1_000,
		choice: "skill",
	},
	{
		level: 4,
		requiredXp: 5_000,
	},
	{
		level: 5,
		requiredXp: 12_000,
		choice: "skill",
	},
	{
		level: 6,
		requiredXp: 20_000,
		choice: "feat",
	},
	{
		level: 7,
		requiredXp: 35_000,
		choice: "skill",
	},
	{
		level: 8,
		requiredXp: 55_000,
	},
	{
		level: 9,
		requiredXp: 80_000,
		choice: "skill",
	},
	{
		level: 10,
		requiredXp: 100_000,
		choice: "feat",
	},
] as const satisfies readonly LevelProgressionEntry[];

export const MAX_HERO_LEVEL = LEVEL_PROGRESSION[LEVEL_PROGRESSION.length - 1].level;
