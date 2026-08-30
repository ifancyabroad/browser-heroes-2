import type { ClassId } from "@app/content";

export type MetricsFilters = {
	from: string;
	to: string;
	mode: "all" | "normal" | "dailyChallenge";
};

export const enemyBattleBands = [
	{ value: "all", label: "All battles", from: null, to: null },
	{ value: "1-10", label: "1–10", from: 1, to: 10 },
	{ value: "11-20", label: "11–20", from: 11, to: 20 },
	{ value: "21-30", label: "21–30", from: 21, to: 30 },
	{ value: "31-40", label: "31–40", from: 31, to: 40 },
	{ value: "41-50", label: "41–50", from: 41, to: 50 },
	{ value: "51-60", label: "51–60", from: 51, to: 60 },
	{ value: "61-70", label: "61–70", from: 61, to: 70 },
	{ value: "71-80", label: "71–80", from: 71, to: 80 },
	{ value: "81-90", label: "81–90", from: 81, to: 90 },
	{ value: "91-100", label: "91–100", from: 91, to: 100 },
	{ value: "101+", label: "101+", from: 101, to: null },
] as const;

export type EnemyBattleBand = (typeof enemyBattleBands)[number]["value"];

export type EnemyMetricsFilters = {
	classId: ClassId | "";
	encounterType: "all" | "standard" | "boss" | "ghost";
	battleBand: EnemyBattleBand;
	minCombats: number;
};

export type EnemyMetricsQuery = MetricsFilters & EnemyMetricsFilters;

export const defaultEnemyMetricsFilters: EnemyMetricsFilters = {
	classId: "",
	encounterType: "all",
	battleBand: "all",
	minCombats: 1,
};

export type SkillMetricsFilters = {
	classId: ClassId | "";
};

export type SkillMetricsQuery = MetricsFilters & SkillMetricsFilters;

export const defaultSkillMetricsFilters: SkillMetricsFilters = {
	classId: "",
};
