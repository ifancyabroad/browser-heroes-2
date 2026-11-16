import { createServer } from "node:http";
import { once } from "node:events";
import express from "express";
import { io as connect, type Socket } from "socket.io-client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	ADMIN_ACTIVITY_EVENT,
	ADMIN_REALTIME_NAMESPACE,
	type AdminActivityEntry,
} from "@app/shared";

vi.mock("../config/session", async () => {
	const { default: session } = await import("express-session");
	return {
		sessionMiddleware: session({
			secret: "admin-transport-tests",
			resave: false,
			saveUninitialized: false,
		}),
	};
});
vi.mock("../models/user.model", () => ({
	UserModel: {
		findById: (id: string) => ({
			select: async () =>
				id === "admin"
					? { type: "registered", email: "admin@example.com" }
					: { type: id === "guest" ? "guest" : "registered", email: "other@example.com" },
		}),
	},
}));

import { sessionMiddleware } from "../config/session";
import { createSocketServer } from "./index";
import { notifyAdminActivity } from "../notifications/adminActivity";
import { env } from "../config/env";

const entry: AdminActivityEntry = {
	id: "entry",
	createdAt: "2026-11-16T12:00:00Z",
	runId: "run",
	heroName: "Mira",
	classId: "mage",
	mode: "normal",
	displayName: null,
	event: { type: "hero_created" },
};

describe("admin realtime transport", () => {
	let originalEmail: string | undefined;
	beforeEach(() => {
		originalEmail = env.ADMIN_EMAIL;
		env.ADMIN_EMAIL = "admin@example.com";
	});
	afterEach(() => {
		env.ADMIN_EMAIL = originalEmail;
	});

	async function setup() {
		const app = express();
		app.use(sessionMiddleware);
		app.post("/session/:user", (req, res) => {
			req.session.userId = req.params.user;
			res.sendStatus(204);
		});
		app.post("/logout", (req, res) => {
			req.session.destroy(() => res.sendStatus(204));
		});
		app.post("/expire", (req, res) => {
			req.session.cookie.expires = new Date(0);
			req.session.save(() => res.sendStatus(204));
		});
		const http = createServer(app);
		const io = createSocketServer(http);
		http.listen(0, "127.0.0.1");
		await once(http, "listening");
		const address = http.address();
		if (!address || typeof address === "string") {
			throw new Error("No test address");
		}
		const base = `http://127.0.0.1:${address.port}`;
		const clients: Socket[] = [];
		async function client(user?: string) {
			const response = user
				? await fetch(`${base}/session/${user}`, { method: "POST" })
				: null;
			const cookie = response?.headers.get("set-cookie")?.split(";")[0] ?? "";
			const socket = connect(`${base}${ADMIN_REALTIME_NAMESPACE}`, {
				autoConnect: false,
				reconnection: false,
				forceNew: true,
				extraHeaders: { Cookie: cookie },
			});
			clients.push(socket);
			return { socket, cookie };
		}
		return {
			client,
			base,
			close: async () => {
				clients.forEach((socket) => socket.disconnect());
				await new Promise<void>((resolve) => io.close(() => resolve()));
			},
		};
	}

	it.each([undefined, "guest", "other"])("rejects a non-admin connection (%s)", async (user) => {
		const server = await setup();
		try {
			const { socket } = await server.client(user);
			const rejected = new Promise<Error>((resolve) => socket.once("connect_error", resolve));
			socket.connect();
			expect((await rejected).message).toBe("Not authorized.");
		} finally {
			await server.close();
		}
	});

	it.each(["logout", "expire"])(
		"delivers to admin, reconnects, and stops delivery after %s",
		async (invalidate) => {
			const server = await setup();
			try {
				const { socket, cookie } = await server.client("admin");
				let connected = new Promise<void>((resolve) => socket.once("connect", resolve));
				socket.connect();
				await connected;
				const received = new Promise<AdminActivityEntry>((resolve) =>
					socket.once(ADMIN_ACTIVITY_EVENT, resolve),
				);
				await notifyAdminActivity([entry]);
				expect(await received).toEqual(entry);
				socket.disconnect();
				connected = new Promise<void>((resolve) => socket.once("connect", resolve));
				socket.connect();
				await connected;
				const noDelivery = vi.fn();
				socket.on(ADMIN_ACTIVITY_EVENT, noDelivery);
				await fetch(`${server.base}/${invalidate}`, {
					method: "POST",
					headers: { Cookie: cookie },
				});
				const disconnected = new Promise<void>((resolve) =>
					socket.once("disconnect", () => resolve()),
				);
				await notifyAdminActivity([{ ...entry, id: "private" }]);
				await disconnected;
				expect(noDelivery).not.toHaveBeenCalled();
			} finally {
				await server.close();
			}
		},
	);
});
