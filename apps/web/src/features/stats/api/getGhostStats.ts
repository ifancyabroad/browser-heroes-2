import type { GetGhostStatsQuery, GetGhostStatsResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getGhostStats(query: GetGhostStatsQuery, signal?: AbortSignal) {
	return api
		.get("stats/ghosts", {
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
		.json<GetGhostStatsResponse>();
}
