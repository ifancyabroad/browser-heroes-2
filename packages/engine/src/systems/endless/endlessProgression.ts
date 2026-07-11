import { BATTLES_PER_ENDLESS_CYCLE } from "./endlessConstants";

export function getEndlessCycleForBattle(battleNumber: number): number {
	return Math.floor((battleNumber - 1) / BATTLES_PER_ENDLESS_CYCLE);
}

export function hasDefeatedFinalBoss(battleNumber: number): boolean {
	return battleNumber > BATTLES_PER_ENDLESS_CYCLE;
}

export function isFinalBossVictory(battleNumber: number, endlessCycle: number): boolean {
	return battleNumber === BATTLES_PER_ENDLESS_CYCLE && endlessCycle === 0;
}
