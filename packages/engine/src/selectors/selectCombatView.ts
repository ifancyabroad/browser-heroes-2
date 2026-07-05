import type { CombatState, RunState } from "../schemas";
import type { Zone } from "@app/content";

import { getZoneForRun } from "../systems/encounters/zones/getZoneForRun";
import { calculateGoldMultiplier } from "../systems/progression/rewards/calculateGoldMultiplier";

export type CombatViewState = {
	combat: CombatState;

	battleNumber: number;
	zoneNumber: number;
	zone: Zone;

	gold: number;
	xp: number;
	streak: number;
	goldMultiplier: number;

	isActive: boolean;
	isVictory: boolean;
	isDefeat: boolean;

	hasPendingLevelUp: boolean;
	hasPendingRewardChoice: boolean;
	canLeaveVictory: boolean;
};

export function selectCombatView(state: RunState): CombatViewState | null {
	if (state.phase !== "combat" || !state.combat) {
		return null;
	}

	const { combat } = state;

	return {
		combat,

		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: getZoneForRun(state.zoneNumber),

		gold: state.gold,
		xp: state.hero.xp,
		streak: state.streak,
		goldMultiplier: calculateGoldMultiplier(state.streak),

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
