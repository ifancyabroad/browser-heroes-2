import type { RequestHandler } from "express";
import { vi } from "vitest";

process.env.NODE_ENV ??= "test";
process.env.MONGO_URI ??= "mongodb://localhost/browser-heroes-test";
process.env.SESSION_SECRET ??= "test-session-secret";

vi.mock("../config/session", () => ({
	sessionMiddleware: ((req, _res, next) => {
		const userId = req.header("x-test-user-id");
		req.session = {
			userId: userId || undefined,
			regenerate: (callback: (error: unknown) => void) => callback(null),
			save: (callback?: (error: unknown) => void) => callback?.(null),
			destroy: (callback: (error: unknown) => void) => callback(null),
		} as unknown as typeof req.session;
		next();
	}) satisfies RequestHandler,
}));
