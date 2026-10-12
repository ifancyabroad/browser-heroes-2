import type { CombatState, RunState } from "../schemas";
import type { Zone } from "@app/content";
import { getZoneOptions } from "../systems/encounters/zones/getZoneOptions";

import { calculateGoldMultiplier } from "../systems/progression/rewards/calculateGoldMultiplier";
import { MAX_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";

export type CombatViewState = {
	combat: CombatState;

	battleNumber: number;
	zoneNumber: number;
	zone: Zone;
	nextZoneOptions: readonly Zone[];

	gold: number;
	xp: number;
	streak: number;
	goldMultiplier: number;
	healingPotions: number;
	maxHealingPotions: number;
	enemyDescriptor: string | undefined;

	isActive: boolean;
	isVictory: boolean;
	isDefeat: boolean;

	hasPendingLevelUp: boolean;
	hasPendingRewardChoice: boolean;
	canLeaveVictory: boolean;
};

export function selectCombatView(state: RunState): CombatViewState | null {
	// Dead runs retain their resolved combat so the UI can present the authoritative final frame.
	if ((state.phase !== "combat" && state.phase !== "dead") || !state.combat) {
		return null;
	}

	const { combat } = state;

	return {
		combat,

		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: state.zone,
		nextZoneOptions: getZoneOptions(state.zoneNumber + 1),

		gold: state.gold,
		xp: state.hero.xp,
		streak: state.streak,
		goldMultiplier: calculateGoldMultiplier(state.streak),
		healingPotions: state.hero.healingPotions,
		maxHealingPotions: MAX_HEALING_POTIONS,
		enemyDescriptor: getEnemyDescriptor(combat),

		isActive: combat.status === "active",
		isVictory: combat.status === "player_won",
		isDefeat: combat.status === "enemy_won",

		hasPendingLevelUp: state.hero.pendingLevelUp !== null,
		hasPendingRewardChoice: state.pendingRewardChoice !== null,
		canLeaveVictory:
			combat.status === "player_won" &&
			state.hero.pendingLevelUp === null &&
			state.pendingRewardChoice === null,
	};
}

function getEnemyDescriptor(combat: CombatState): string | undefined {
	if (combat.encounterType === "boss") {
		return "Boss";
	}

	if (combat.encounterType === "ghost") {
		return combat.ghostUsername ?? undefined;
	}

	return undefined;
}
