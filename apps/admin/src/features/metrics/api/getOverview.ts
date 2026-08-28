import type { AdminMetricsOverviewResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { MetricsFilters } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function getOverview(filters: MetricsFilters, signal?: AbortSignal) {
	return api
		.get("admin/metrics/overview", {
			searchParams: toMetricsSearchParams(filters),
			signal,
		})
		.json<AdminMetricsOverviewResponse>();
}
