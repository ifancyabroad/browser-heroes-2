import { createServer } from "node:http";
import type { WorldLogEntry } from "@app/shared";
import { describe, expect, it, vi } from "vitest";
import { notifyWorldLogEntry, subscribeToWorldLog } from "../notifications/worldLog";
import { createSocketServer } from "./index";

const entry: WorldLogEntry = {
	id: "entry",
	createdAt: "2026-01-01T00:00:00.000Z",
	heroName: "Mira",
	classId: "mage",
	displayName: null,
	mode: "normal",
	event: { type: "hero_created" },
};

describe("world log notifications", () => {
	it("broadcasts once through the player room and unsubscribes on server shutdown", async () => {
		const http = createServer();
		const io = createSocketServer(http);
		const broadcast = vi.spyOn(io.of("/").adapter, "broadcast");
		try {
			notifyWorldLogEntry(entry);
			expect(broadcast).toHaveBeenCalledExactlyOnceWith(
				expect.objectContaining({ data: ["world-log:entry", entry] }),
				expect.objectContaining({ rooms: new Set(["world-log"]) }),
			);
		} finally {
			await new Promise<void>((resolve) => {
				void io.close(() => resolve());
			});
		}
		broadcast.mockClear();
		notifyWorldLogEntry(entry);
		expect(broadcast).not.toHaveBeenCalled();
	});

	it("isolates listener failures and supports explicit unsubscription", () => {
		const error = vi.spyOn(console, "error").mockImplementation(() => {});
		const unsubscribeFailure = subscribeToWorldLog(() => {
			throw new Error("delivery failed");
		});
		const receive = vi.fn();
		const unsubscribe = subscribeToWorldLog(receive);
		try {
			expect(() => notifyWorldLogEntry(entry)).not.toThrow();
			expect(receive).toHaveBeenCalledExactlyOnceWith(entry);
			unsubscribe();
			notifyWorldLogEntry(entry);
			expect(receive).toHaveBeenCalledTimes(1);
		} finally {
			unsubscribe();
			unsubscribeFailure();
			error.mockRestore();
		}
	});
});
