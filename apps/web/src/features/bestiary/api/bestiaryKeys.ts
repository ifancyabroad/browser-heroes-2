export const bestiaryKeys = {
	all: ["bestiary"] as const,
	entries: () => [...bestiaryKeys.all, "entries"] as const,
};
