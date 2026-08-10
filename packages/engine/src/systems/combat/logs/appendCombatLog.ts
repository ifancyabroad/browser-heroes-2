import type { CombatState } from "../../../schemas";
import type { CombatLogEntryInput } from "../../../schemas/log.schema";

import { createCombatLogEntry } from "./createCombatLogEntry";

export function appendCombatLog(combat: CombatState, entry: CombatLogEntryInput): CombatState {
	return {
		...combat,
		log: [...combat.log, createCombatLogEntry(combat.id, combat.log.length + 1, entry)],
	};
}
