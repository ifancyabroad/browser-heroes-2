import { useQuery } from "@tanstack/react-query";
import { getSkillMetrics } from "../api/getSkillMetrics";
import { metricsKeys } from "../api/metricsKeys";
import type { MetricsFilters, SkillMetricsFilters } from "../types";

export function useSkillMetrics(filters: MetricsFilters, skillFilters: SkillMetricsFilters) {
	const query = { ...filters, ...skillFilters };
	return useQuery({
		queryKey: metricsKeys.skills(filters, skillFilters),
		queryFn: ({ signal }) => getSkillMetrics(query, signal),
	});
}
