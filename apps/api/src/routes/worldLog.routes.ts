import { Router } from "express";
import { requireUserSession } from "../middlewares/auth";
import { getWorldLog } from "../services/worldLog.service";

export const worldLogRoutes = Router();

worldLogRoutes.get("/", requireUserSession, async (_req, res) => {
	res.json({ entries: await getWorldLog() });
});
