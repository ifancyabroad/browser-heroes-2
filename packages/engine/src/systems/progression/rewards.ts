import type { RunState } from "../../schemas";

export type CombatReward = {
	gold: number;
	xp: number;
};

export function calculateCombatReward(state: RunState): CombatReward {
	return {
		gold: 10 * state.goldMultiplier,
		xp: 5,
	};
}

export function applyCombatReward(state: RunState, reward: CombatReward): RunState {
	return {
		...state,
		gold: state.gold + reward.gold,
		hero: {
			...state.hero,
			xp: state.hero.xp + reward.xp,
		},
	};
}
