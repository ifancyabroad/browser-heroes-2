import { REWARD_CONFIG } from "../constants/rewardConfig";

export type CombatReward = {
	gold: number;
	xp: number;
};

type CalculateCombatRewardInput = {
	enemyLevel: number;
	enemyThreat: number;
	goldMultiplier: number;
};

export function calculateCombatReward(input: CalculateCombatRewardInput): CombatReward {
	return {
		gold: Math.floor(REWARD_CONFIG.baseGold * input.enemyThreat * input.goldMultiplier),
		xp: Math.floor(REWARD_CONFIG.baseExperience * input.enemyLevel * input.enemyThreat),
	};
}
