export const MAX_ATTRIBUTE_SCORE = 30;

export function calculateAttributeModifier(score: number): number {
	return Math.floor((score - 10) / 2);
}
