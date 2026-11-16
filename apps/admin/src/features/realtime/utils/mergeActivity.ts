import { ADMIN_ACTIVITY_LIMIT, type AdminActivityEntry } from "@app/shared";

export function mergeActivity(...batches: AdminActivityEntry[][]): AdminActivityEntry[] {
	const entries = new Map(batches.flat().map((entry) => [entry.id, entry]));
	return [...entries.values()]
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id))
		.slice(-ADMIN_ACTIVITY_LIMIT);
}
