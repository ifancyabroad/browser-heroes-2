import { useQuery } from "@tanstack/react-query";
import { getSkillMetrics } from "../api/getSkillMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters } from "../types";

export function useSkillMetrics(filters: MetricsFilters) {
	return useQuery({
		queryKey: metricsKeys.skills(filters),
		queryFn: ({ signal }) => getSkillMetrics(filters, signal),
	});
}
