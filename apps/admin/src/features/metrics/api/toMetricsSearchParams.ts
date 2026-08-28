import type { MetricsFilters } from "../types";

export function toMetricsSearchParams(filters: MetricsFilters) {
	return {
		from: filters.from,
		to: filters.to,
		...(filters.mode === "all" ? {} : { mode: filters.mode }),
	};
}
