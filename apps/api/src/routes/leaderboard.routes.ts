import { Router } from "express";
import {
	getGhostLeaderboardController,
	getRunLeaderboardController,
} from "../controllers/leaderboard.controller";
import { requireUserSession } from "../middlewares/auth";

export const leaderboardRoutes = Router();

leaderboardRoutes.get("/runs", requireUserSession, getRunLeaderboardController);

leaderboardRoutes.get("/ghosts", requireUserSession, getGhostLeaderboardController);
