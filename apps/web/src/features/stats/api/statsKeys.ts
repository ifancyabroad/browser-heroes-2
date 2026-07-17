import type { GetGhostStatsQuery, GetRunStatsQuery } from "@app/shared";

export const statsKeys = {
	all: ["stats"] as const,
	summary: () => [...statsKeys.all, "summary"] as const,
	runs: (query: GetRunStatsQuery) => [...statsKeys.all, "runs", query] as const,
	ghosts: (query: GetGhostStatsQuery) => [...statsKeys.all, "ghosts", query] as const,
};
