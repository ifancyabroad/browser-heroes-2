import type { MetricsFilters } from "../types";

export const metricsKeys = {
	all: ["metrics"] as const,
	overview: (filters: MetricsFilters) => [...metricsKeys.all, "overview", filters] as const,
	classes: (filters: MetricsFilters) => [...metricsKeys.all, "classes", filters] as const,
	enemies: (filters: MetricsFilters) => [...metricsKeys.all, "enemies", filters] as const,
};
