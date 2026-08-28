import { useQuery } from "@tanstack/react-query";
import { getPlayerMetrics } from "../api/getPlayerMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function usePlayerMetrics(filters: MetricsFilters) {
	return useQuery({
		queryKey: metricsKeys.players(filters),
		queryFn: ({ signal }) => getPlayerMetrics(filters, signal),
	});
}
