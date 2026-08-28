import { useQuery } from "@tanstack/react-query";
import { getRunMetrics } from "../api/getRunMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function useRunMetrics(filters: MetricsFilters) {
	return useQuery({
		queryKey: metricsKeys.runs(filters),
		queryFn: ({ signal }) => getRunMetrics(filters, signal),
	});
}
