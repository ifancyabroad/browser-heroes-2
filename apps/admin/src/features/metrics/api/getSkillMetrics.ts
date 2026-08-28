import type { AdminSkillMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { MetricsFilters } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function getSkillMetrics(filters: MetricsFilters, signal?: AbortSignal) {
	return api
		.get("admin/metrics/skills", {
			searchParams: toMetricsSearchParams(filters),
			signal,
		})
		.json<AdminSkillMetricsResponse>();
}
