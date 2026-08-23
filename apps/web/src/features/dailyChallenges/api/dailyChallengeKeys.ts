import type { ChallengeLeaderboardQuery } from "@app/shared";

export const dailyChallengeKeys = {
	all: ["dailyChallenges"] as const,
	summary: (date: string) => [...dailyChallengeKeys.all, "summary", date] as const,
	leaderboard: (date: string, query: ChallengeLeaderboardQuery) =>
		[...dailyChallengeKeys.all, "leaderboard", date, query] as const,
};
