import type { AdminEnemyMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { MetricsFilters } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function getEnemyMetrics(filters: MetricsFilters, signal?: AbortSignal) {
	return api
		.get("admin/metrics/enemies", {
			searchParams: toMetricsSearchParams(filters),
			signal,
		})
		.json<AdminEnemyMetricsResponse>();
}
