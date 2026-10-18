import { createServer } from "node:http";
import { once } from "node:events";
import express from "express";
import { io as connect, type Socket } from "socket.io-client";
import type { WorldLogEntry } from "@app/shared";
import { describe, expect, it, vi } from "vitest";

// Real session cookies and network connections, without using the application's Mongo store.
vi.mock("../config/session", async () => {
	const { default: session } = await import("express-session");
	return {
		sessionMiddleware: session({
			secret: "world-log-transport-test",
			resave: false,
			saveUninitialized: false,
		}),
	};
});

import { sessionMiddleware } from "../config/session";
import { createSocketServer } from "./index";
import { notifyWorldLogEntry } from "../notifications/worldLog";

const entry: WorldLogEntry = {
	id: "first",
	createdAt: "2026-01-01T00:00:00.000Z",
	heroName: "Mira",
	classId: "mage",
	displayName: "Registered player",
	mode: "dailyChallenge",
	event: { type: "hero_created" },
};

function connected(socket: Socket): Promise<void> {
	return new Promise((resolve, reject) => {
		socket.once("connect", () => {
			socket.off("connect_error", reject);
			resolve();
		});
		socket.once("connect_error", reject);
		socket.connect();
	});
}

function nextEntry(socket: Socket): Promise<WorldLogEntry> {
	return new Promise((resolve) => socket.once("world-log:entry", resolve));
}

describe("World Log network delivery", () => {
	it("delivers once to two player sessions, excludes anonymous connections and resumes after reconnect", async () => {
		const app = express();
		app.use(sessionMiddleware);
		app.post("/session/:id", (req, res) => {
			req.session.userId = req.params.id;
			res.sendStatus(204);
		});
		const http = createServer(app);
		const io = createSocketServer(http);
		const clients: Socket[] = [];
		try {
			http.listen(0, "127.0.0.1");
			await once(http, "listening");
			const address = http.address();
			if (!address || typeof address === "string") {
				throw new Error("Missing test server address");
			}
			const url = `http://127.0.0.1:${address.port}`;
			for (const user of ["guest-player", "registered-player", null]) {
				const response = user
					? await fetch(`${url}/session/${user}`, { method: "POST" })
					: null;
				const cookie = response?.headers.get("set-cookie")?.split(";")[0];
				const client = connect(url, {
					autoConnect: false,
					reconnection: false,
					forceNew: true,
					transports: ["websocket"],
					extraHeaders: cookie ? { Cookie: cookie } : {},
				});
				clients.push(client);
				await connected(client);
			}
			const [guest, registered, anonymous] = clients;
			const received = clients.map(() => vi.fn());
			clients.forEach((client, index) => client.on("world-log:entry", received[index]));
			const first = Promise.all([nextEntry(guest), nextEntry(registered)]);
			notifyWorldLogEntry(entry);
			expect(await first).toEqual([entry, entry]);
			guest.disconnect();
			const offlineEntry = { ...entry, id: "while-disconnected" };
			const stillOnline = nextEntry(registered);
			notifyWorldLogEntry(offlineEntry);
			expect(await stillOnline).toEqual(offlineEntry);
			await connected(guest);
			const finalEntry = { ...entry, id: "after-reconnect" };
			const reconnected = Promise.all([nextEntry(guest), nextEntry(registered)]);
			notifyWorldLogEntry(finalEntry);
			expect(await reconnected).toEqual([finalEntry, finalEntry]);
			expect(received[0].mock.calls.map(([event]) => event.id)).toEqual([
				"first",
				"after-reconnect",
			]);
			expect(received[1].mock.calls.map(([event]) => event.id)).toEqual([
				"first",
				"while-disconnected",
				"after-reconnect",
			]);
			expect(anonymous.connected).toBe(true);
			expect(received[2]).not.toHaveBeenCalled();
		} finally {
			clients.forEach((client) => client.disconnect());
			await new Promise<void>((resolve) => {
				void io.close(() => resolve());
			});
		}
	}, 10_000);
});
