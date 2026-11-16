import type { RunMode } from "@app/shared";

export const realtimeKeys = {
	all: ["realtime"] as const,
	activity: () => [...realtimeKeys.all, "activity"] as const,
	heroes: () => [...realtimeKeys.all, "heroes"] as const,
	activeHeroes: (mode: RunMode | "all") => [...realtimeKeys.heroes(), mode] as const,
};
