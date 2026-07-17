import type { GetGhostLeaderboardQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGhostLeaderboard } from "../api/getGhostLeaderboard";
import { leaderboardKeys } from "../api/leaderboardKeys";

export function useGhostLeaderboard(query: GetGhostLeaderboardQuery, enabled = true) {
	return useQuery({
		queryKey: leaderboardKeys.ghosts(query),
		queryFn: ({ signal }) => getGhostLeaderboard(query, signal),
		placeholderData: keepPreviousData,
		enabled,
	});
}
