import type { GetRunLeaderboardQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRunLeaderboard } from "../api/getRunLeaderboard";
import { leaderboardKeys } from "../api/leaderboardKeys";

export function useRunLeaderboard(query: GetRunLeaderboardQuery, enabled = true) {
	return useQuery({
		queryKey: leaderboardKeys.runs(query),
		queryFn: ({ signal }) => getRunLeaderboard(query, signal),
		placeholderData: keepPreviousData,
		enabled,
	});
}
