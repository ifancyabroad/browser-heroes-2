import type { GetGhostHistoryQuery, GetRunHistoryQuery } from "@app/shared";

export const historyKeys = {
	all: ["history"] as const,
	runs: (query: GetRunHistoryQuery) => [...historyKeys.all, "runs", query] as const,
	ghosts: (query: GetGhostHistoryQuery) => [...historyKeys.all, "ghosts", query] as const,
};
