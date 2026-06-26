import type { RunState } from "../../../schemas";
import type { CombatReward } from "./calculateCombatReward";

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
