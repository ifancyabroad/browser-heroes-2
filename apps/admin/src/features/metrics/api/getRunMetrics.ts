import type { AdminRunMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { MetricsFilters } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function getRunMetrics(filters: MetricsFilters, signal?: AbortSignal) {
	return api
		.get("admin/metrics/runs", {
			searchParams: toMetricsSearchParams(filters),
			signal,
		})
		.json<AdminRunMetricsResponse>();
}
