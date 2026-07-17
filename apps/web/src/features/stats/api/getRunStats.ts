import type { GetRunStatsQuery, GetRunStatsResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getRunStats(query: GetRunStatsQuery, signal?: AbortSignal) {
	return api
		.get("stats/runs", {
			signal,
			searchParams: {
				page: query.page,
				limit: query.limit,
				...(query.classId ? { classId: query.classId } : {}),
				...(query.search ? { search: query.search } : {}),
				sort: query.sort,
				direction: query.direction,
			},
		})
		.json<GetRunStatsResponse>();
}
