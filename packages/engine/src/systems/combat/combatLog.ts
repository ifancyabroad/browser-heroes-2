import type { CombatLogEntry, CombatState } from "../../schemas";
import { createCombatLogId } from "../../core/ids";

export function createCombatLogEntry(
	combat: CombatState,
	entry: Omit<CombatLogEntry, "id">,
): CombatLogEntry {
	return {
		id: createCombatLogId(combat.id, combat.log.length + 1),
		...entry,
	};
}

export function appendCombatLog(
	combat: CombatState,
	entry: Omit<CombatLogEntry, "id">,
): CombatState {
	return {
		...combat,
		log: [...combat.log, createCombatLogEntry(combat, entry)],
	};
}
