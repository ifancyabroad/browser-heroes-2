import type { RunState } from "../../../schemas";

import { getEnemyDefinition } from "../../encounters/getEnemyDefinition";
import { syncHeroFromPlayerCombatant } from "../../combat/combatants/syncHeroFromCombatant";
import { applyCombatReward } from "./applyCombatReward";
import { calculateCombatReward, type CombatReward } from "./calculateCombatReward";
import { calculateGoldMultiplier } from "./calculateGoldMultiplier";
import { createPendingLevelUp } from "../levelUp/createPendingLevelUp";

export type ApplyVictoryRewardResult = {
	state: RunState;
	reward: CombatReward;
};

export function applyVictoryReward(state: RunState): ApplyVictoryRewardResult | null {
	if (!state.combat) {
		return null;
	}

	const enemyDefinition = getEnemyDefinition(state.combat.enemy.sourceId);

	if (!enemyDefinition) {
		return null;
	}

	const reward = calculateCombatReward({
		enemyLevel: state.combat.enemy.level,
		enemyThreat: enemyDefinition.threat,
		goldMultiplier: calculateGoldMultiplier(state.streak),
	});

	const syncedState: RunState = {
		...state,
		hero: syncHeroFromPlayerCombatant(state.hero, state.combat.player),
	};

	const rewardedState = applyCombatReward(syncedState, reward);

	const pendingLevelUpResult = createPendingLevelUp(rewardedState.hero, rewardedState.rngState);

	return {
		state: {
			...rewardedState,
			rngState: pendingLevelUpResult.rngState,
			hero: {
				...rewardedState.hero,
				pendingLevelUp: pendingLevelUpResult.value,
			},
		},
		reward,
	};
}
