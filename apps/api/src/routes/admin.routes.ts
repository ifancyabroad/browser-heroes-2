import { Router } from "express";
import {
	getAdminClassMetricsController,
	getAdminEnemyMetricsController,
	getAdminMetricsOverviewController,
	getAdminPlayerMetricsController,
	getAdminRunMetricsController,
	getAdminSkillMetricsController,
} from "../controllers/adminMetrics.controller";
import { requireAdmin } from "../middlewares/admin";

export const adminRoutes = Router();
adminRoutes.use(requireAdmin);
adminRoutes.get("/metrics/overview", getAdminMetricsOverviewController);
adminRoutes.get("/metrics/players", getAdminPlayerMetricsController);
adminRoutes.get("/metrics/runs", getAdminRunMetricsController);
adminRoutes.get("/metrics/classes", getAdminClassMetricsController);
adminRoutes.get("/metrics/enemies", getAdminEnemyMetricsController);
adminRoutes.get("/metrics/skills", getAdminSkillMetricsController);
