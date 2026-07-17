import { Router } from "express";
import {
	getGhostLeaderboardController,
	getRunLeaderboardController,
} from "../controllers/leaderboard.controller";

export const leaderboardRoutes = Router();

leaderboardRoutes.get("/runs", getRunLeaderboardController);

leaderboardRoutes.get("/ghosts", getGhostLeaderboardController);
