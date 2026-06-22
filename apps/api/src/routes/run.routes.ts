import { Router } from "express";
import { applyRunActionBodySchema, createRunBodySchema } from "@app/shared";
import {
	applyRunActionController,
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
runRoutes.post("/:runId/actions", validateBody(applyRunActionBodySchema), applyRunActionController);
