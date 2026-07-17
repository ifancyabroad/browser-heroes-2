import type { GetGhostLeaderboardQuery, GetGhostLeaderboardResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getGhostLeaderboard(query: GetGhostLeaderboardQuery, signal?: AbortSignal) {
	return api
		.get("leaderboard/ghosts", {
			signal,
			searchParams: {
				...(query.classId ? { classId: query.classId } : {}),
				...(query.userOnly ? { userOnly: query.userOnly } : {}),
				page: query.page,
				limit: query.limit,
			},
		})
		.json<GetGhostLeaderboardResponse>();
}
