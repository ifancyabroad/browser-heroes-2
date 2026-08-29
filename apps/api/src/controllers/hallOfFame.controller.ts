import type { Request, Response } from "express";
import type { GetGhostHallOfFameResponse, GetHeroHallOfFameResponse } from "@app/shared";
import { getGhostHallOfFameQuerySchema, getHeroHallOfFameQuerySchema } from "@app/shared";
import { getGhostHallOfFame, getHeroHallOfFame } from "../services/hallOfFame.service";

export async function getHeroHallOfFameController(
	req: Request,
	res: Response<GetHeroHallOfFameResponse>,
) {
	const query = getHeroHallOfFameQuerySchema.parse(req.query);
	res.status(200).json(await getHeroHallOfFame({ userId: req.session.userId, query }));
}

export async function getGhostHallOfFameController(
	req: Request,
	res: Response<GetGhostHallOfFameResponse>,
) {
	const query = getGhostHallOfFameQuerySchema.parse(req.query);
	res.status(200).json(await getGhostHallOfFame({ userId: req.session.userId, query }));
}
