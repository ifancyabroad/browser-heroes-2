import { Router } from "express";
import { getBestiaryController } from "../controllers/bestiary.controller";
import { requireUserSession } from "../middlewares/auth";

export const bestiaryRoutes = Router();

bestiaryRoutes.get("/", requireUserSession, getBestiaryController);
