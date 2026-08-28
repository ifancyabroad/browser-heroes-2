import type {
	EngineEvent,
	HeroState,
	ItemInstance,
	PendingRewardChoice,
	RunState,
} from "../../../schemas";

import { getEnemyDefinition } from "../../encounters/getEnemyDefinition";
import { appendCombatLog } from "../../combat/logs/appendCombatLog";
import { applyCombatReward } from "./applyCombatReward";
import { calculateCombatReward, type CombatReward } from "./calculateCombatReward";
import { calculateGoldMultiplier } from "./calculateGoldMultiplier";
import { createPendingLevelUp } from "../levelUp/createPendingLevelUp";
import { createPendingRewardChoice } from "./createPendingRewardChoice";
import { createSkillOfferEvents } from "../levelUp/createSkillOfferEvents";
import { createItemOfferEvents } from "../../items/createItemOfferEvents";

export type ApplyVictoryRewardResult = {
	state: RunState;
	reward: CombatReward;
	events: EngineEvent[];
};

export function applyVictoryReward(state: RunState): ApplyVictoryRewardResult | null {
	const combat = state.combat;

	if (!combat) {
		return null;
	}

	const enemyThreat = getCombatRewardThreat(state);

	if (enemyThreat === null) {
		return null;
	}

	const reward = calculateCombatReward({
		enemyLevel: combat.enemy.level,
		enemyThreat,
		goldMultiplier: calculateGoldMultiplier(state.streak),
	});

	const combatWithRewardLog = appendCombatLog(combat, {
		turnNumber: combat.turnNumber,
		actor: "player",
		message: `${combat.player.name} gains ${reward.xp} XP and ${reward.gold} gold.`,
		eventType: "reward_gained",
	});

	const stateWithRewardLog: RunState = {
		...state,
		combat: combatWithRewardLog,
	};

	const rewardedState = applyCombatReward(stateWithRewardLog, reward);

	const pendingLevelUp = createPendingLevelUp(rewardedState.hero, rewardedState.seed);

	const hero: HeroState = {
		...rewardedState.hero,
		pendingLevelUp,
	};

	const pendingRewardChoice = createPendingRewardChoice({
		runId: rewardedState.id,
		seed: rewardedState.seed,
		hero,
		zoneNumber: rewardedState.zoneNumber,
		battleNumber: rewardedState.battleNumber,
		encounterType: combat.encounterType,
		pendingRewardChoice: rewardedState.pendingRewardChoice,
	});

	return {
		state: {
			...rewardedState,
			hero,
			pendingRewardChoice,
		},
		reward,
		events: [
			...createSkillOfferEvents(pendingLevelUp),
			...createItemOfferEvents({
				items: getRewardItems(pendingRewardChoice),
				source: "reward",
				battleNumber: rewardedState.battleNumber,
			}),
		],
	};
}

function getRewardItems(rewardChoice: PendingRewardChoice | null): ItemInstance[] {
	const items: ItemInstance[] = [];

	for (const option of rewardChoice?.options ?? []) {
		if (option.type === "item") {
			items.push(option.item);
		}
	}

	return items;
}

function getCombatRewardThreat(state: RunState): number | null {
	const combat = state.combat;

	if (!combat) {
		return null;
	}

	if (combat.encounterType === "ghost") {
		return calculateGhostThreat(combat.enemy.level);
	}

	const enemyDefinition = getEnemyDefinition(combat.enemy.sourceId);

	return enemyDefinition?.threat ?? null;
}

function calculateGhostThreat(level: number): number {
	return Math.min(30, Math.max(1, level * 3));
}
