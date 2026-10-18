import { WORLD_LOG_LIMIT, type WorldLogEntry } from "@app/shared";

export function mergeWorldLogEntries(...groups: WorldLogEntry[][]): WorldLogEntry[] {
	return [...new Map(groups.flat().map((entry) => [entry.id, entry])).values()]
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id))
		.slice(-WORLD_LOG_LIMIT);
}
