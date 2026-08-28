import type { MetricsFilters } from "../types";

export const metricsKeys = {
	all: ["metrics"] as const,
	overview: (filters: MetricsFilters) => [...metricsKeys.all, "overview", filters] as const,
	players: (filters: MetricsFilters) => [...metricsKeys.all, "players", filters] as const,
	runs: (filters: MetricsFilters) => [...metricsKeys.all, "runs", filters] as const,
	classes: (filters: MetricsFilters) => [...metricsKeys.all, "classes", filters] as const,
	enemies: (filters: MetricsFilters) => [...metricsKeys.all, "enemies", filters] as const,
	skills: (filters: MetricsFilters) => [...metricsKeys.all, "skills", filters] as const,
};
