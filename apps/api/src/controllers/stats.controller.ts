import type { Request, Response } from "express";
import type {
	GetGhostStatsResponse,
	GetRunStatsResponse,
	GetUserStatsSummaryResponse,
} from "@app/shared";
import { getGhostStatsQuerySchema, getRunStatsQuerySchema } from "@app/shared";
import { getGhostStats, getRunStats, getUserStatsSummary } from "../services/stats.service";

export async function getRunStatsController(req: Request, res: Response<GetRunStatsResponse>) {
	const query = getRunStatsQuerySchema.parse(req.query);

	const response = await getRunStats({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}

export async function getGhostStatsController(req: Request, res: Response<GetGhostStatsResponse>) {
	const query = getGhostStatsQuerySchema.parse(req.query);

	const response = await getGhostStats({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}

export async function getUserStatsSummaryController(
	req: Request,
	res: Response<GetUserStatsSummaryResponse>,
) {
	const response = await getUserStatsSummary(req.session.userId!);

	res.status(200).json(response);
}
