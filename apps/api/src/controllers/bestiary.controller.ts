import type { GetBestiaryResponse } from "@app/shared";
import type { Request, Response } from "express";
import { getBestiary } from "../services/bestiary.service";

export async function getBestiaryController(req: Request, res: Response<GetBestiaryResponse>) {
	res.status(200).json(await getBestiary(req.session.userId!));
}
