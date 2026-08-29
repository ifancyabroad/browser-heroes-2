import { Router } from "express";
import {
	getGhostHallOfFameController,
	getHeroHallOfFameController,
} from "../controllers/hallOfFame.controller";

export const hallOfFameRoutes = Router();

hallOfFameRoutes.get("/heroes", getHeroHallOfFameController);
hallOfFameRoutes.get("/ghosts", getGhostHallOfFameController);
