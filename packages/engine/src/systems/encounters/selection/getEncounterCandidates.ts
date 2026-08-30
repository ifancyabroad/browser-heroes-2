import { enemies, type Enemy, type Zone } from "@app/content";

import type { CombatState } from "../../../schemas";

import { isEnemyEligibleForEncounter } from "../eligibility/isEnemyEligibleForEncounter";

type GetEncounterCandidatesInput = {
	zone: Zone;
	encounterType: CombatState["encounterType"];
	battleNumber: number;
};

export function getEncounterCandidates(input: GetEncounterCandidatesInput): readonly Enemy[] {
	const candidates = enemies.filter((enemy) =>
		isEnemyEligibleForEncounter(enemy, input.zone, input.encounterType),
	);

	if (input.battleNumber !== 1 || candidates.length === 0) {
		return candidates;
	}

	const lowestThreat = Math.min(...candidates.map(({ threat }) => threat));
	return candidates.filter(({ threat }) => threat === lowestThreat);
}
