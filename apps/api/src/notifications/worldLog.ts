import type { WorldLogEntry } from "@app/shared";

// Process-local notifications for committed entries. The socket server owns its subscription.
const listeners = new Set<(entry: WorldLogEntry) => void>();

export function subscribeToWorldLog(listener: (entry: WorldLogEntry) => void): () => void {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

export function notifyWorldLogEntry(entry: WorldLogEntry): void {
	for (const listener of listeners) {
		try {
			listener(entry);
		} catch (error) {
			// Delivery failure must not turn committed gameplay into a failed request.
			console.error("World log delivery failed", error);
		}
	}
}
