import type { Enemy, Zone } from "@app/content";

import type { CombatState } from "../../../schemas";

export function isEnemyEligibleForEncounter(
	enemy: Enemy,
	zone: Zone,
	encounterType: CombatState["encounterType"],
): boolean {
	if (enemy.encounter.zone !== zone) {
		return false;
	}

	return encounterType === "boss" ? enemy.rank === "boss" : enemy.rank !== "boss";
}
