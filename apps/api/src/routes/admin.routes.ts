import { Router } from "express";
import {
	getAdminClassMetricsController,
	getAdminMetricsOverviewController,
} from "../controllers/adminMetrics.controller";
import { requireAdmin } from "../middlewares/admin";

export const adminRoutes = Router();
adminRoutes.use(requireAdmin);
adminRoutes.get("/metrics/overview", getAdminMetricsOverviewController);
adminRoutes.get("/metrics/classes", getAdminClassMetricsController);
