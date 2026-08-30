import type { Enemy } from "@app/content";

import type { RngResult, RngState } from "../../../core/rng";

import { getEncounterTypeForBattle } from "../getEncounterTypeForBattle";
import { getZoneForRun } from "../zones/getZoneForRun";
import { getEncounterCandidates } from "./getEncounterCandidates";
import { selectWeightedEnemy } from "./selectWeightedEnemy";

type SelectEnemyForEncounterInput = {
	battleNumber: number;
	zoneNumber: number;
	rngState: RngState;
};

export function selectEnemyForEncounter(
	input: SelectEnemyForEncounterInput,
): RngResult<Enemy> | null {
	const zone = getZoneForRun(input.zoneNumber);
	const encounterType = getEncounterTypeForBattle(input.battleNumber);
	const candidates = getEncounterCandidates({
		zone,
		encounterType,
		battleNumber: input.battleNumber,
	});

	return selectWeightedEnemy(input.rngState, candidates);
}
