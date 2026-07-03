import type { HeroState, RunState } from "../../../schemas";

import { getEnemyDefinition } from "../../encounters/getEnemyDefinition";
import { syncHeroFromPlayerCombatant } from "../../combat/combatants/syncHeroFromCombatant";
import { applyCombatReward } from "./applyCombatReward";
import { calculateCombatReward, type CombatReward } from "./calculateCombatReward";
import { calculateGoldMultiplier } from "./calculateGoldMultiplier";
import { createPendingLevelUp } from "../levelUp/createPendingLevelUp";
import { createPendingRewardChoice } from "./createPendingRewardChoice";

export type ApplyVictoryRewardResult = {
	state: RunState;
	reward: CombatReward;
};

export function applyVictoryReward(state: RunState): ApplyVictoryRewardResult | null {
	const combat = state.combat;

	if (!combat) {
		return null;
	}

	const enemyDefinition = getEnemyDefinition(combat.enemy.sourceId);

	if (!enemyDefinition) {
		return null;
	}

	const reward = calculateCombatReward({
		enemyLevel: combat.enemy.level,
		enemyThreat: enemyDefinition.threat,
		goldMultiplier: calculateGoldMultiplier(state.streak),
	});

	const syncedState: RunState = {
		...state,
		hero: syncHeroFromPlayerCombatant(state.hero, combat.player),
	};

	const rewardedState = applyCombatReward(syncedState, reward);

	const pendingLevelUpResult = createPendingLevelUp(rewardedState.hero, rewardedState.rngState);

	const hero: HeroState = {
		...rewardedState.hero,
		pendingLevelUp: pendingLevelUpResult.value,
	};

	const pendingRewardResult = createPendingRewardChoice({
		hero,
		zoneNumber: rewardedState.zoneNumber,
		battleNumber: rewardedState.battleNumber,
		encounterType: combat.encounterType,
		pendingRewardChoice: rewardedState.pendingRewardChoice,
		rngState: pendingLevelUpResult.rngState,
	});

	return {
		state: {
			...rewardedState,
			rngState: pendingRewardResult.rngState,
			hero,
			pendingRewardChoice: pendingRewardResult.value,
		},
		reward,
	};
}
