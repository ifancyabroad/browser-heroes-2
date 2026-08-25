import { enemies, type Enemy, type Zone } from "@app/content";

import type { CombatState } from "../../../schemas";

import { isEnemyEligibleForEncounter } from "../eligibility/isEnemyEligibleForEncounter";

export function getEncounterCandidates(
	zone: Zone,
	encounterType: CombatState["encounterType"],
): readonly Enemy[] {
	return enemies.filter((enemy) => isEnemyEligibleForEncounter(enemy, zone, encounterType));
}
