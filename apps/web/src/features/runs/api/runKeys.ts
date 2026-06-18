export const runKeys = {
	all: ["runs"] as const,
	current: () => [...runKeys.all, "current"] as const,
	detail: (runId: string) => [...runKeys.all, "detail", runId] as const,
};
