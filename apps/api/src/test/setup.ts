import type { RequestHandler } from "express";
import { vi } from "vitest";

vi.mock("../config/session", () => ({
	sessionMiddleware: ((req, _res, next) => {
		const userId = req.header("x-test-user-id");
		req.session = {
			userId: userId || undefined,
		} as typeof req.session;
		next();
	}) satisfies RequestHandler,
}));
