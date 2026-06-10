import { Router } from "express";
import {
	createRunController,
	getCurrentRunController,
	getRunController,
} from "../controllers/run.controller";
import { requireUserSession } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { createRunBodySchema } from "../schemas/runApi.schema";

export const runRoutes = Router();

runRoutes.use(requireUserSession);

runRoutes.post("/", validateBody(createRunBodySchema), createRunController);
runRoutes.get("/current", getCurrentRunController);
runRoutes.get("/:runId", getRunController);
