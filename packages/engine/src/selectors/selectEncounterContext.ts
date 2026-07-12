import type { CombatState } from "../schemas";
import { getEncounterTypeForBattle } from "../systems/encounters";
import { getZoneNumberForBattle } from "../systems/encounters/zones/getZoneNumberForBattle";
import { getEndlessCycleForBattle } from "../systems/endless/endlessProgression";

export type EncounterContext = {
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	encounterType: CombatState["encounterType"];
	ghostEncounterLevel: number;
};

export function selectEncounterContext(battleNumber: number): EncounterContext {
	const zoneNumber = getZoneNumberForBattle(battleNumber);
	const endlessCycle = getEndlessCycleForBattle(battleNumber);

	return {
		battleNumber,
		zoneNumber,
		endlessCycle,
		encounterType: getEncounterTypeForBattle(battleNumber),
		ghostEncounterLevel: endlessCycle > 0 ? 10 : Math.min(zoneNumber, 10),
	};
}
