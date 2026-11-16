import type { AdminActivityEntry } from "@app/shared";

const listeners = new Set<(entries: AdminActivityEntry[]) => Promise<void>>();

export function subscribeToAdminActivity(
	listener: (entries: AdminActivityEntry[]) => Promise<void>,
): () => void {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export async function notifyAdminActivity(entries: AdminActivityEntry[]): Promise<void> {
	await Promise.all(
		[...listeners].map(async (listener) => {
			try {
				await listener(entries);
			} catch (error) {
				console.error("Admin activity delivery failed", error);
			}
		}),
	);
}
