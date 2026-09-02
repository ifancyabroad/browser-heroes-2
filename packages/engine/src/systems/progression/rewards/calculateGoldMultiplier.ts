import { REWARD_CONFIG } from "../constants/rewardConfig";

export function calculateGoldMultiplier(streak: number): number {
	return Math.min(
		REWARD_CONFIG.maxGoldMultiplier,
		1 + Math.max(0, streak) * REWARD_CONFIG.goldMultiplierPerStreak,
	);
}
