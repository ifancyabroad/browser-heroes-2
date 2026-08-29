import type { GetGhostHallOfFameQuery, GetHeroHallOfFameQuery } from "@app/shared";

export const hallOfFameKeys = {
	all: ["hallOfFame"] as const,
	heroes: (query: GetHeroHallOfFameQuery) => [...hallOfFameKeys.all, "heroes", query] as const,
	ghosts: (query: GetGhostHallOfFameQuery) => [...hallOfFameKeys.all, "ghosts", query] as const,
};
