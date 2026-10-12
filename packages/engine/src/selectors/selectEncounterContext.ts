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

	return {
		battleNumber,
		zoneNumber,
		endlessCycle: getEndlessCycleForBattle(battleNumber),
		encounterType: getEncounterTypeForBattle(battleNumber),
		ghostEncounterLevel: zoneNumber,
	};
}
