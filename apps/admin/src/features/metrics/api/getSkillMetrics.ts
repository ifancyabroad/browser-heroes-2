import type { AdminSkillMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { SkillMetricsQuery } from "../types";
import { toSkillMetricsSearchParams } from "./toSkillMetricsSearchParams";

export function getSkillMetrics(query: SkillMetricsQuery, signal?: AbortSignal) {
	return api
		.get("admin/metrics/skills", {
			searchParams: toSkillMetricsSearchParams(query),
			signal,
		})
		.json<AdminSkillMetricsResponse>();
}
