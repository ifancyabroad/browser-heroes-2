import { Router } from "express";
import {
	getAdminClassMetricsController,
	getAdminEnemyMetricsController,
	getAdminMetricsOverviewController,
	getAdminPlayerMetricsController,
	getAdminRunMetricsController,
	getAdminSkillMetricsController,
} from "../controllers/adminMetrics.controller";
import {
	getAdminActivityController,
	getAdminActiveHeroesController,
} from "../controllers/adminRealtime.controller";
import { requireAdmin } from "../middlewares/admin";

export const adminRoutes = Router();
adminRoutes.use(requireAdmin);
adminRoutes.get("/realtime/activity", getAdminActivityController);
adminRoutes.get("/realtime/heroes", getAdminActiveHeroesController);
adminRoutes.get("/metrics/overview", getAdminMetricsOverviewController);
adminRoutes.get("/metrics/players", getAdminPlayerMetricsController);
adminRoutes.get("/metrics/runs", getAdminRunMetricsController);
adminRoutes.get("/metrics/classes", getAdminClassMetricsController);
adminRoutes.get("/metrics/enemies", getAdminEnemyMetricsController);
adminRoutes.get("/metrics/skills", getAdminSkillMetricsController);
