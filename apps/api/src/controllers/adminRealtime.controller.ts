import type { Request, Response } from "express";
import {
	adminRealtimeQuerySchema,
	type AdminActivityResponse,
	type AdminActiveHeroesResponse,
} from "@app/shared";
import { getAdminActivity } from "../services/adminActivity.service";
import { getAdminActiveHeroes } from "../services/adminRealtime.service";

export async function getAdminActivityController(
	_req: Request,
	res: Response<AdminActivityResponse>,
) {
	const entries = await getAdminActivity();
	res.status(200).json({ entries });
}

export async function getAdminActiveHeroesController(
	req: Request,
	res: Response<AdminActiveHeroesResponse>,
) {
	const query = adminRealtimeQuerySchema.parse(req.query);
	const heroes = await getAdminActiveHeroes(query.mode);
	res.status(200).json({ heroes });
}
