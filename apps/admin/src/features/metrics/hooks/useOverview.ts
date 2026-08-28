import { useQuery } from "@tanstack/react-query";
import { getOverview } from "../api/getOverview";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function useOverview(filters: MetricsFilters, enabled = true) {
	return useQuery({
		queryKey: metricsKeys.overview(filters),
		enabled,
		queryFn: ({ signal }) => getOverview(filters, signal),
	});
}
