export const BATTLES_PER_ZONE = 10;

export function getZoneBattleNumber(battleNumber: number): number {
	return ((battleNumber - 1) % BATTLES_PER_ZONE) + 1;
}

export function getZoneNumberForBattle(battleNumber: number): number {
	return Math.floor((battleNumber - 1) / BATTLES_PER_ZONE) + 1;
}
