import { useQuery } from "@tanstack/react-query";
import { getClassMetrics } from "../api/getClassMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function useClassMetrics(filters: MetricsFilters) {
	return useQuery({
		queryKey: metricsKeys.classes(filters),
		queryFn: ({ signal }) => getClassMetrics(filters, signal),
	});
}
