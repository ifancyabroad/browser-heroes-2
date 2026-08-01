import { Router } from "express";
import {
	getGhostHistoryController,
	getRunHistoryController,
} from "../controllers/history.controller";
import { requireUserSession } from "../middlewares/auth";

export const historyRoutes = Router();

historyRoutes.get("/runs", requireUserSession, getRunHistoryController);

historyRoutes.get("/ghosts", requireUserSession, getGhostHistoryController);
