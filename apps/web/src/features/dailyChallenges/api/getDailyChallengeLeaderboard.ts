import type { ChallengeLeaderboardQuery, GetChallengeLeaderboardResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getDailyChallengeLeaderboard(
	date: string,
	query: ChallengeLeaderboardQuery,
	signal?: AbortSignal,
) {
	return api
		.get(`daily-challenges/${date}/leaderboard`, {
			signal,
			searchParams: { page: query.page, limit: query.limit },
		})
		.json<GetChallengeLeaderboardResponse>();
}
