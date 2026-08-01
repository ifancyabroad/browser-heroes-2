import type { GetGhostHistoryQuery, GetGhostHistoryResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getGhostHistory(query: GetGhostHistoryQuery, signal?: AbortSignal) {
	return api
		.get("history/ghosts", {
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
		.json<GetGhostHistoryResponse>();
}
