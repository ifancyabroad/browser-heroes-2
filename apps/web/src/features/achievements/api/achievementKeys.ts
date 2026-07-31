export const achievementKeys = {
	all: ["achievements"] as const,
	unlocks: () => [...achievementKeys.all, "unlocks"] as const,
};
