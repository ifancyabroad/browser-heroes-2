import type { AdminEnemyMetricsResponse } from "@app/shared";
import { api } from "../../../lib/api";
import type { EnemyMetricsQuery } from "../types";
import { toEnemyMetricsSearchParams } from "./toEnemyMetricsSearchParams";

export function getEnemyMetrics(query: EnemyMetricsQuery, signal?: AbortSignal) {
	return api
		.get("admin/metrics/enemies", {
			searchParams: toEnemyMetricsSearchParams(query),
			signal,
		})
		.json<AdminEnemyMetricsResponse>();
}
