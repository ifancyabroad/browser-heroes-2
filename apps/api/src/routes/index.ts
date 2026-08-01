import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";
import { runRoutes } from "./run.routes";
import { leaderboardRoutes } from "./leaderboard.routes";
import { historyRoutes } from "./history.routes";
import { contactRoutes } from "./contact.routes";
import { achievementRoutes } from "./achievement.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/health", healthRoutes);
routes.use("/runs", runRoutes);
routes.use("/leaderboard", leaderboardRoutes);
routes.use("/history", historyRoutes);
routes.use("/contact", contactRoutes);
routes.use("/achievements", achievementRoutes);
