import type { Enemy, Zone } from "@app/content";

import type { CombatState } from "../../../schemas";

import { isInBattleRange } from "./isInBattleRange";

export function isEnemyEligibleForEncounter(
	enemy: Enemy,
	zone: Zone,
	battleNumber: number,
	encounterType: CombatState["encounterType"],
): boolean {
	if (enemy.encounter.zone !== zone) {
		return false;
	}

	if (!isInBattleRange(enemy, battleNumber)) {
		return false;
	}

	return encounterType === "boss" ? enemy.rank === "boss" : enemy.rank !== "boss";
}
