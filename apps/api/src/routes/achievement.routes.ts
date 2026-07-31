import { Router } from "express";
import { getAchievementsController } from "../controllers/achievement.controller";
import { requireUserSession } from "../middlewares/auth";

export const achievementRoutes = Router();

achievementRoutes.get("/", requireUserSession, getAchievementsController);
