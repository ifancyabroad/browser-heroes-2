import type { GetAchievementsResponse } from "@app/shared";
import type { Request, Response } from "express";
import { getAchievements } from "../services/achievement.service";

export async function getAchievementsController(
	req: Request,
	res: Response<GetAchievementsResponse>,
) {
	res.status(200).json(await getAchievements(req.session.userId!));
}
