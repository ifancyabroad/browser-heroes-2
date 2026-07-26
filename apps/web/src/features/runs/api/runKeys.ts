export const runKeys = {
	all: ["runs"] as const,
	current: () => [...runKeys.all, "current"] as const,
	game: () => [...runKeys.all, "game"] as const,
	detail: (runId: string) => [...runKeys.all, "detail", runId] as const,
	hero: (runId: string | null) => [...runKeys.all, "hero", runId] as const,
};
