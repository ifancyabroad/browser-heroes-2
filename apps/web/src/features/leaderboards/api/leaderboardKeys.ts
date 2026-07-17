import type { GetGhostLeaderboardQuery, GetRunLeaderboardQuery } from "@app/shared";

export const leaderboardKeys = {
	all: ["leaderboards"] as const,
	runs: (query: GetRunLeaderboardQuery) => [...leaderboardKeys.all, "runs", query] as const,
	ghosts: (query: GetGhostLeaderboardQuery) => [...leaderboardKeys.all, "ghosts", query] as const,
};
