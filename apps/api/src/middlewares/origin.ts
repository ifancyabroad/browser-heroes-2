import type { RequestHandler } from "express";
import { env } from "../config/env";

export const requireTrustedOrigin: RequestHandler = (req, res, next) => {
	const origin = req.get("origin");
	if (origin && origin !== env.APP_URL) {
		res.status(403).json({ error: "Untrusted request origin." });
		return;
	}
	next();
};
