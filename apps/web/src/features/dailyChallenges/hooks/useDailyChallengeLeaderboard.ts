import type { ChallengeLeaderboardQuery } from "@app/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { dailyChallengeKeys } from "../api/dailyChallengeKeys";
import { getDailyChallengeLeaderboard } from "../api/getDailyChallengeLeaderboard";

export function useDailyChallengeLeaderboard(date: string, query: ChallengeLeaderboardQuery) {
	return useQuery({
		queryKey: dailyChallengeKeys.leaderboard(date, query),
		queryFn: ({ signal }) => getDailyChallengeLeaderboard(date, query, signal),
		placeholderData: keepPreviousData,
		meta: { errorMessage: "Unable to load the challenge leaderboard. Please try again later." },
	});
}
