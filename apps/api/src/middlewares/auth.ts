import type { RequestHandler } from "express";

export const requireUserSession: RequestHandler = (req, res, next) => {
	if (!req.session.userId) {
		res.status(401).json({
			error: "UNAUTHENTICATED",
			message: "A user session is required.",
		});
		return;
	}

	next();
};
