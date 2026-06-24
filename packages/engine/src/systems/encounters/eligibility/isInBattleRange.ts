import type { Enemy } from "@app/content";

export function isInBattleRange(enemy: Enemy, battleNumber: number): boolean {
	const { minBattle, maxBattle } = enemy.encounter;

	return (
		(minBattle === undefined || battleNumber >= minBattle) &&
		(maxBattle === undefined || battleNumber <= maxBattle)
	);
}
