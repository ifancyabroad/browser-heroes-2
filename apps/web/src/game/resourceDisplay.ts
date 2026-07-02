import type { HeroProgressionView } from "@app/engine";

export function getXpResource(progression: HeroProgressionView) {
	if (progression.nextLevelXp === null) {
		return {
			value: "Max",
			fillPercent: 100,
		};
	}

	const progressXp = Math.max(0, progression.xp - progression.currentLevelXp);
	const neededXp = Math.max(1, progression.nextLevelXp - progression.currentLevelXp);

	return {
		value: `${progressXp}/${neededXp}`,
		fillPercent: (progressXp / neededXp) * 100,
	};
}
