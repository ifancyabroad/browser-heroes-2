import { useQuery } from "@tanstack/react-query";
import { getEnemyMetrics } from "../api/getEnemyMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { EnemyMetricsFilters, EnemyMetricsQuery, MetricsFilters } from "../types";

export function useEnemyMetrics(filters: MetricsFilters, enemyFilters: EnemyMetricsFilters) {
	const query: EnemyMetricsQuery = { ...filters, ...enemyFilters };
	return useQuery({
		queryKey: metricsKeys.enemies(filters, enemyFilters),
		queryFn: ({ signal }) => getEnemyMetrics(query, signal),
	});
}
