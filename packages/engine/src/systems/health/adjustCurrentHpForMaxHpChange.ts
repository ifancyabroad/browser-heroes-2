export function adjustCurrentHpForMaxHpChange(currentHp: number, maxHpDelta: number): number {
	if (currentHp <= 0) {
		return 0;
	}

	return Math.max(1, currentHp + maxHpDelta);
}
