import type { Request, Response } from "express";
import type { GetGhostLeaderboardResponse, GetRunLeaderboardResponse } from "@app/shared";
import { getGhostLeaderboardQuerySchema, getRunLeaderboardQuerySchema } from "@app/shared";
import { getGhostLeaderboard, getRunLeaderboard } from "../services/leaderboard.service";

export async function getRunLeaderboardController(
	req: Request,
	res: Response<GetRunLeaderboardResponse>,
) {
	const query = getRunLeaderboardQuerySchema.parse(req.query);

	const response = await getRunLeaderboard({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}

export async function getGhostLeaderboardController(
	req: Request,
	res: Response<GetGhostLeaderboardResponse>,
) {
	const query = getGhostLeaderboardQuerySchema.parse(req.query);

	const response = await getGhostLeaderboard({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}
