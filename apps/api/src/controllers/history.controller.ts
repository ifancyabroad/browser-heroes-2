import type { Request, Response } from "express";
import type { GetGhostHistoryResponse, GetRunHistoryResponse } from "@app/shared";
import { getGhostHistoryQuerySchema, getRunHistoryQuerySchema } from "@app/shared";
import { getGhostHistory, getRunHistory } from "../services/history.service";

export async function getRunHistoryController(req: Request, res: Response<GetRunHistoryResponse>) {
	const query = getRunHistoryQuerySchema.parse(req.query);

	const response = await getRunHistory({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}

export async function getGhostHistoryController(
	req: Request,
	res: Response<GetGhostHistoryResponse>,
) {
	const query = getGhostHistoryQuerySchema.parse(req.query);

	const response = await getGhostHistory({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}
