import type { GetRunHistoryQuery, GetRunHistoryResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getRunHistory(query: GetRunHistoryQuery, signal?: AbortSignal) {
	return api
		.get("history/runs", {
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
		.json<GetRunHistoryResponse>();
}
