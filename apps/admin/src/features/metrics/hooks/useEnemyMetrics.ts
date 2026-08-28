import { useQuery } from "@tanstack/react-query";
import { getEnemyMetrics } from "../api/getEnemyMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function useEnemyMetrics(filters: MetricsFilters) {
	return useQuery({
		queryKey: metricsKeys.enemies(filters),
		queryFn: ({ signal }) => getEnemyMetrics(filters, signal),
	});
}
