import { BATTLES_PER_ENDLESS_CYCLE } from "./endlessConstants";

export function getEndlessCycleForBattle(battleNumber: number): number {
	return Math.floor((battleNumber - 1) / BATTLES_PER_ENDLESS_CYCLE);
}

export function hasDefeatedFinalBoss(battleNumber: number): boolean {
	return battleNumber > BATTLES_PER_ENDLESS_CYCLE;
}

export function isFinalBossVictory(battleNumber: number): boolean {
	return battleNumber === BATTLES_PER_ENDLESS_CYCLE;
}

export function isEndlessCycleVictory(battleNumber: number): boolean {
	return (
		battleNumber > BATTLES_PER_ENDLESS_CYCLE && battleNumber % BATTLES_PER_ENDLESS_CYCLE === 0
	);
}
