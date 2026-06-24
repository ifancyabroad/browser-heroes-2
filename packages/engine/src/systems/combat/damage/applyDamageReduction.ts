export function applyDamageReduction(amount: number, damageReduction: number): number {
	return Math.max(0, amount - damageReduction);
}
