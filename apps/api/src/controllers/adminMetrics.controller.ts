import type { Request, Response } from "express";
import {
	adminMetricsQuerySchema,
	adminEnemyMetricsQuerySchema,
	type AdminClassMetricsResponse,
	type AdminEnemyMetricsResponse,
	type AdminMetricsOverviewResponse,
	type AdminPlayerMetricsResponse,
	type AdminRunMetricsResponse,
	type AdminSkillMetricsResponse,
} from "@app/shared";
import {
	getAdminClassMetrics,
	getAdminEnemyMetrics,
	getAdminMetricsOverview,
	getAdminPlayerMetrics,
	getAdminRunMetrics,
	getAdminSkillMetrics,
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

export async function getAdminRunMetricsController(
	req: Request,
	res: Response<AdminRunMetricsResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminRunMetrics(query);
	res.status(200).json(metrics);
}

export async function getAdminPlayerMetricsController(
	req: Request,
	res: Response<AdminPlayerMetricsResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminPlayerMetrics(query);
	res.status(200).json(metrics);
}

export async function getAdminEnemyMetricsController(
	req: Request,
	res: Response<AdminEnemyMetricsResponse>,
) {
	const query = adminEnemyMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminEnemyMetrics(query);
	res.status(200).json(metrics);
}

export async function getAdminSkillMetricsController(
	req: Request,
	res: Response<AdminSkillMetricsResponse>,
) {
	const query = adminMetricsQuerySchema.parse(req.query);
	const metrics = await getAdminSkillMetrics(query);
	res.status(200).json(metrics);
}
