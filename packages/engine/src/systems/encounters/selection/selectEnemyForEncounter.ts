import type { Enemy } from "@app/content";

import type { RunState } from "../../../schemas";
import type { RngResult } from "../../../core/rng";

import { getEncounterTypeForBattle } from "../getEncounterTypeForBattle";
import { getZoneForRun } from "../zones/getZoneForRun";
import { getEncounterCandidates } from "./getEncounterCandidates";
import { selectWeightedEnemy } from "./selectWeightedEnemy";

export function selectEnemyForEncounter(state: RunState): RngResult<Enemy> | null {
	const zone = getZoneForRun(state.zoneNumber);

	const encounterType = getEncounterTypeForBattle(state.battleNumber);

	const candidates = getEncounterCandidates(zone, state.battleNumber, encounterType);

	return selectWeightedEnemy(state.rngState, candidates);
}
