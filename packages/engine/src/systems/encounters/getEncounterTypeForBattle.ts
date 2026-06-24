import type { CombatState } from "../../schemas";

export function getEncounterTypeForBattle(battleNumber: number): CombatState["encounterType"] {
	return battleNumber % 10 === 0 ? "boss" : "standard";
}
