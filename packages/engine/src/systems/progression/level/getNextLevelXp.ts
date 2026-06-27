import { MAX_HERO_LEVEL } from "../constants/levelProgression";
import { getLevelProgression } from "./getLevelProgression";

export function getNextLevelXp(currentLevel: number): number | null {
	if (currentLevel >= MAX_HERO_LEVEL) {
		return null;
	}

	return getLevelProgression(currentLevel + 1)?.requiredXp ?? null;
}
