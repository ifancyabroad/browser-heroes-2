import type { Enemy, Zone } from "@app/content";

import type { RngResult, RngState } from "../../../core/rng";

import { getEncounterTypeForBattle } from "../getEncounterTypeForBattle";
import { getEncounterCandidates } from "./getEncounterCandidates";
import { selectWeightedEnemy } from "./selectWeightedEnemy";

type SelectEnemyForEncounterInput = {
	battleNumber: number;
	zone: Zone;
	rngState: RngState;
};

export function selectEnemyForEncounter(
	input: SelectEnemyForEncounterInput,
): RngResult<Enemy> | null {
	const encounterType = getEncounterTypeForBattle(input.battleNumber);
	const candidates = getEncounterCandidates({
		zone: input.zone,
		encounterType,
		battleNumber: input.battleNumber,
	});

	return selectWeightedEnemy(input.rngState, candidates);
}
