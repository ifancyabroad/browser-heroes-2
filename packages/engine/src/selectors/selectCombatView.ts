import type { CombatState, RunState } from "../schemas";
import type { Zone } from "@app/content";
import { getZoneOptions } from "../systems/encounters/zones/getZoneOptions";
import {
	BATTLES_PER_ZONE,
	getZoneBattleNumber,
} from "../systems/encounters/zones/getZoneNumberForBattle";

import { calculateGoldMultiplier } from "../systems/progression/rewards/calculateGoldMultiplier";
import {
	selectConsumableInventory,
	type ConsumableInventoryView,
} from "./selectConsumableInventory";
import { getCombatTurnOrder } from "../systems/combat/rounds/getCombatTurnOrder";

export type CombatTurnOrderEntry = {
	id: string;
	shortName: string;
};

export type CombatViewState = {
	combat: CombatState;
	turnOrder: CombatTurnOrderEntry[];

	battleNumber: number;
	zoneBattleNumber: number;
	battlesPerZone: number;
	zoneNumber: number;
	zone: Zone;
	nextZoneOptions: readonly Zone[];

	gold: number;
	xp: number;
	streak: number;
	goldMultiplier: number;
	consumables: ConsumableInventoryView;
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
		turnOrder: getTurnOrderView(combat),

		battleNumber: state.battleNumber,
		zoneBattleNumber: getZoneBattleNumber(state.battleNumber),
		battlesPerZone: BATTLES_PER_ZONE,
		zoneNumber: state.zoneNumber,
		zone: state.zone,
		nextZoneOptions: getZoneOptions(state.zoneNumber + 1),

		gold: state.gold,
		xp: state.hero.xp,
		streak: state.streak,
		goldMultiplier: calculateGoldMultiplier(state.streak),
		consumables: selectConsumableInventory(state.hero),
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

function getTurnOrderView(combat: CombatState): CombatTurnOrderEntry[] {
	return getCombatTurnOrder(combat).map((side) => {
		const combatant = combat[side];

		return {
			id: combatant.id,
			shortName: combatant.shortName,
		};
	});
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
