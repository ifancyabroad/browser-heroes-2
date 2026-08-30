import type { ClassId } from "@app/content";

export type MetricsFilters = {
	from: string;
	to: string;
	mode: "all" | "normal" | "dailyChallenge";
};

export const enemyBattleBands = [
	{ value: "all", label: "All battles", from: null, to: null },
	{ value: "1-9", label: "1–9", from: 1, to: 9 },
	{ value: "10-19", label: "10–19", from: 10, to: 19 },
	{ value: "20-29", label: "20–29", from: 20, to: 29 },
	{ value: "30-39", label: "30–39", from: 30, to: 39 },
	{ value: "40-49", label: "40–49", from: 40, to: 49 },
	{ value: "50-59", label: "50–59", from: 50, to: 59 },
	{ value: "60-69", label: "60–69", from: 60, to: 69 },
	{ value: "70-79", label: "70–79", from: 70, to: 79 },
	{ value: "80-89", label: "80–89", from: 80, to: 89 },
	{ value: "90-99", label: "90–99", from: 90, to: 99 },
	{ value: "100+", label: "100+", from: 100, to: null },
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
