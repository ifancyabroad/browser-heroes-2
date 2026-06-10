import type { RunState } from "../../schemas";

export type CombatReward = {
	gold: number;
	xp: number;
};

export function calculateCombatReward(state: RunState): CombatReward {
	return {
		// TODO: Add proper formula
		gold: 10 * state.streak,
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
