import { Router } from "express";
import { createRunBodySchema } from "@app/shared";
import {
	createRunController,
	getCurrentRunController,
	getRunController,
} from "../controllers/run.controller";
import { requireUserSession } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";

export const runRoutes = Router();

runRoutes.use(requireUserSession);

runRoutes.post("/", validateBody(createRunBodySchema), createRunController);
runRoutes.get("/current", getCurrentRunController);
runRoutes.get("/:runId", getRunController);
