import { LEVEL_PROGRESSION, type LevelProgressionEntry } from "../constants/levelProgression";

export function getLevelProgression(level: number): LevelProgressionEntry | null {
	return LEVEL_PROGRESSION.find((entry) => entry.level === level) ?? null;
}
