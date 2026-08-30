import type { RequestHandler } from "express";
import { env } from "../config/env";
import { UserModel } from "../models/user.model";
import { isAdminUser } from "../services/auth.service";

export const requireAdmin: RequestHandler = async (req, res, next) => {
	if (!req.session.userId) {
		res.status(401).json({ error: "UNAUTHENTICATED", message: "A user session is required." });
		return;
	}

	if (!env.ADMIN_EMAIL) {
		res.status(403).json({ error: "FORBIDDEN", message: "Not authorized." });
		return;
	}

	const user = await UserModel.findById(req.session.userId).select("type email");

	if (!user || !isAdminUser(user)) {
		res.status(403).json({ error: "FORBIDDEN", message: "Not authorized." });
		return;
	}

	next();
};
