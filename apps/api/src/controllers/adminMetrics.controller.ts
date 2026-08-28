import type { Request, Response } from "express";
import {
	adminMetricsQuerySchema,
	type AdminClassMetricsResponse,
	type AdminEnemyMetricsResponse,
	type AdminMetricsOverviewResponse,
} from "@app/shared";
import {
	getAdminClassMetrics,
	getAdminEnemyMetrics,
	getAdminMetricsOverview,
} from "../services/adminMetrics.service";

export async function getAdminMetricsOverviewController(
	req: Request,
	res: Response<AdminMetricsOverviewResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminMetricsOverview(query);
	res.status(200).json(metrics);
}

export async function getAdminClassMetricsController(
	req: Request,
	res: Response<AdminClassMetricsResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminClassMetrics(query);
	res.status(200).json(metrics);
}

export async function getAdminEnemyMetricsController(
	req: Request,
	res: Response<AdminEnemyMetricsResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminEnemyMetrics(query);
	res.status(200).json(metrics);
}
