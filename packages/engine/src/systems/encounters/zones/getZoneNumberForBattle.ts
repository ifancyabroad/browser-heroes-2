export function getZoneNumberForBattle(battleNumber: number): number {
	return Math.ceil(battleNumber / 10);
}
