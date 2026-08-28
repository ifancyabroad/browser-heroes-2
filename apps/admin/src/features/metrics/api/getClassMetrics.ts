import type { AdminClassMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { MetricsFilters } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function getClassMetrics(filters: MetricsFilters, signal?: AbortSignal) {
	return api
		.get("admin/metrics/classes", {
			searchParams: toMetricsSearchParams(filters),
			signal,
		})
		.json<AdminClassMetricsResponse>();
}
