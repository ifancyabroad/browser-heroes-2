export function calculateBaseProficiencyBonus(level: number): number {
	const normalisedLevel = Math.max(1, level);

	return 2 + Math.floor((normalisedLevel - 1) / 4);
}
