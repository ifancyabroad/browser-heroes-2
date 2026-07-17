import type { GetRunLeaderboardQuery, GetRunLeaderboardResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getRunLeaderboard(query: GetRunLeaderboardQuery, signal?: AbortSignal) {
	return api
		.get("leaderboard/runs", {
			signal,
			searchParams: {
				scope: query.scope,
				...(query.date ? { date: query.date } : {}),
				...(query.classId ? { classId: query.classId } : {}),
				...(query.userOnly ? { userOnly: query.userOnly } : {}),
				page: query.page,
				limit: query.limit,
			},
		})
		.json<GetRunLeaderboardResponse>();
}
