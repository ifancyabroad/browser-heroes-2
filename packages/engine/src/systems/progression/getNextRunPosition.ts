import { createContextRngState } from "../../core/rng";
import type { RunState } from "../../schemas";
import { getZoneNumberForBattle } from "../encounters/zones/getZoneNumberForBattle";
import { selectZone } from "../encounters/zones/selectZone";
import { getEndlessCycleForBattle } from "../endless/endlessProgression";

type RunPosition = Pick<RunState, "battleNumber" | "zoneNumber" | "zone" | "endlessCycle">;

export function getNextRunPosition(state: RunState): RunPosition {
	const battleNumber = state.battleNumber + 1;
	const zoneNumber = getZoneNumberForBattle(battleNumber);
	const zone = getNextZone(state, zoneNumber);
	const endlessCycle = getEndlessCycleForBattle(battleNumber);

	return { battleNumber, zoneNumber, zone, endlessCycle };
}

function getNextZone(state: RunState, zoneNumber: number): RunState["zone"] {
	if (zoneNumber === state.zoneNumber) {
		return state.zone;
	}

	return selectZone(zoneNumber, createContextRngState(state.seed, "zone", zoneNumber));
}
