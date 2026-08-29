import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";
import { runRoutes } from "./run.routes";
import { dailyChallengeRoutes } from "./dailyChallenge.routes";
import { historyRoutes } from "./history.routes";
import { contactRoutes } from "./contact.routes";
import { achievementRoutes } from "./achievement.routes";
import { apiBaselineLimit } from "../middlewares/rateLimits";
import { adminRoutes } from "./admin.routes";
import { hallOfFameRoutes } from "./hallOfFame.routes";

export const routes = Router();

routes.use(apiBaselineLimit);
routes.use("/auth", authRoutes);
routes.use("/health", healthRoutes);
routes.use("/runs", runRoutes);
routes.use("/daily-challenges", dailyChallengeRoutes);
routes.use("/hall-of-fame", hallOfFameRoutes);
routes.use("/history", historyRoutes);
routes.use("/contact", contactRoutes);
routes.use("/achievements", achievementRoutes);
routes.use("/admin", adminRoutes);
