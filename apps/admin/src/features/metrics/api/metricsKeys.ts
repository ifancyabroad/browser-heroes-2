import type { EnemyMetricsFilters, MetricsFilters, SkillMetricsFilters } from "../types";

export const metricsKeys = {
	all: ["metrics"] as const,
	overview: (filters: MetricsFilters) => [...metricsKeys.all, "overview", filters] as const,
	players: (filters: MetricsFilters) => [...metricsKeys.all, "players", filters] as const,
	runs: (filters: MetricsFilters) => [...metricsKeys.all, "runs", filters] as const,
	classes: (filters: MetricsFilters) => [...metricsKeys.all, "classes", filters] as const,
	enemies: (filters: MetricsFilters, enemyFilters: EnemyMetricsFilters) =>
		[...metricsKeys.all, "enemies", filters, enemyFilters] as const,
	skills: (filters: MetricsFilters, skillFilters: SkillMetricsFilters) =>
		[...metricsKeys.all, "skills", filters, skillFilters] as const,
};
