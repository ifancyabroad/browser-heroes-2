import type { Request, Response } from "express";
import type { HealthResponse } from "@app/shared";

export function getHealth(_req: Request, res: Response<HealthResponse>) {
	res.status(200).json({
		ok: true,
		service: "browser-heroes-api",
	});
}
