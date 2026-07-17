import type { Request, Response } from "express";
import type {
	ApiErrorResponse,
	GetGhostLeaderboardResponse,
	GetRunLeaderboardResponse,
} from "@app/shared";
import { getGhostLeaderboardQuerySchema, getRunLeaderboardQuerySchema } from "@app/shared";
import { getGhostLeaderboard, getRunLeaderboard } from "../services/leaderboard.service";

export async function getRunLeaderboardController(
	req: Request,
	res: Response<GetRunLeaderboardResponse | ApiErrorResponse>,
) {
	const query = getRunLeaderboardQuerySchema.parse(req.query);

	if (query.userOnly === "true" && !req.session.userId) {
		res.status(401).json({
			error: "UNAUTHENTICATED",
			message: "You must be signed in to view your own leaderboard entries.",
		});
		return;
	}

	const response = await getRunLeaderboard({
		userId: req.session.userId,
		query,
	});

	res.status(200).json(response);
}

export async function getGhostLeaderboardController(
	req: Request,
	res: Response<GetGhostLeaderboardResponse | ApiErrorResponse>,
) {
	const query = getGhostLeaderboardQuerySchema.parse(req.query);

	if (query.userOnly === "true" && !req.session.userId) {
		res.status(401).json({
			error: "UNAUTHENTICATED",
			message: "You must be signed in to view your own leaderboard entries.",
		});
		return;
	}

	const response = await getGhostLeaderboard({
		userId: req.session.userId!,
		query,
	});

	res.status(200).json(response);
}
