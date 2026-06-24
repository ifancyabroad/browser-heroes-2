import type { CombatLogEntry, CombatState } from "../../../schemas";

import { createCombatLogEntry } from "./createCombatLogEntry";

export function appendCombatLog(
	combat: CombatState,
	entry: Omit<CombatLogEntry, "id">,
): CombatState {
	return {
		...combat,
		log: [...combat.log, createCombatLogEntry(combat.id, combat.log.length + 1, entry)],
	};
}
