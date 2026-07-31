import type { GetAchievementsResponse } from "@app/shared";
import type { Request, Response } from "express";
import { getAchievementUnlocks } from "../services/achievement.service";

export async function getAchievementsController(
	req: Request,
	res: Response<GetAchievementsResponse>,
) {
	res.status(200).json({
		unlocks: await getAchievementUnlocks(req.session.userId!),
	});
}
