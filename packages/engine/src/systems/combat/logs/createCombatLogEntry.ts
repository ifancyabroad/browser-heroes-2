import type { CombatLogEntry } from "../../../schemas";
import { createCombatLogId } from "../../../core/ids";

export function createCombatLogEntry(
	combatId: string,
	index: number,
	entry: Omit<CombatLogEntry, "id">,
): CombatLogEntry {
	return {
		id: createCombatLogId(combatId, index),
		...entry,
	};
}
