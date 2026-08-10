import type { CombatLogEntry } from "../../../schemas";
import type { CombatLogEntryInput } from "../../../schemas/log.schema";
import { createCombatLogId } from "../../../core/ids";

export function createCombatLogEntry(
	combatId: string,
	index: number,
	entry: CombatLogEntryInput,
): CombatLogEntry {
	return {
		id: createCombatLogId(combatId, index),
		...entry,
	};
}
