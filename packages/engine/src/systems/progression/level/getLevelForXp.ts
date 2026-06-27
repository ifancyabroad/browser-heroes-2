import { LEVEL_PROGRESSION } from "../constants/levelProgression";

export function getLevelForXp(xp: number): number {
	const normalisedXp = Math.max(0, Math.floor(xp));

	for (let index = LEVEL_PROGRESSION.length - 1; index >= 0; index -= 1) {
		const progression = LEVEL_PROGRESSION[index];

		if (normalisedXp >= progression.requiredXp) {
			return progression.level;
		}
	}

	return 1;
}
