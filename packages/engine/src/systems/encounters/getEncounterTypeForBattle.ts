import type { CombatState } from "../../schemas";

export function getEncounterTypeForBattle(
	battleNumber: number,
): Exclude<CombatState["encounterType"], "ghost"> {
	return battleNumber % 10 === 0 ? "boss" : "standard";
}
