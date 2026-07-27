import type { Request } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";

const WINDOW_MS = 15 * 60 * 1000;

function createIpLimit(limit: number, skipSuccessfulRequests = false) {
	return rateLimit({
		windowMs: WINDOW_MS,
		limit,
		skipSuccessfulRequests,
		standardHeaders: "draft-8",
	});
}

function emailKey(req: Request) {
	const email = typeof req.body?.email === "string" ? req.body.email : "";
	const normalizedEmail = email.trim().toLowerCase();

	return normalizedEmail || `ip:${ipKeyGenerator(req.ip ?? "127.0.0.1")}`;
}

function createEmailLimit(limit: number, skipSuccessfulRequests = false) {
	return rateLimit({
		windowMs: WINDOW_MS,
		limit,
		keyGenerator: emailKey,
		skipSuccessfulRequests,
		standardHeaders: "draft-8",
	});
}

export const guestCreationLimit = createIpLimit(60);
export const registrationLimit = createIpLimit(5);
export const loginLimits = [createIpLimit(20, true), createEmailLimit(10, true)];
export const passwordResetRequestLimits = [createIpLimit(10), createEmailLimit(3)];
export const passwordResetCompletionLimit = createIpLimit(10);
