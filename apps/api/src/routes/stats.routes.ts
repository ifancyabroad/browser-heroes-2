import { Router } from "express";
import {
	getGhostStatsController,
	getRunStatsController,
	getUserStatsSummaryController,
} from "../controllers/stats.controller";
import { requireUserSession } from "../middlewares/auth";

export const statsRoutes = Router();

statsRoutes.get("/summary", requireUserSession, getUserStatsSummaryController);

statsRoutes.get("/runs", requireUserSession, getRunStatsController);

statsRoutes.get("/ghosts", requireUserSession, getGhostStatsController);
