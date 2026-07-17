import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";
import { runRoutes } from "./run.routes";
import { leaderboardRoutes } from "./leaderboard.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/health", healthRoutes);
routes.use("/runs", runRoutes);
routes.use("/leaderboard", leaderboardRoutes);
