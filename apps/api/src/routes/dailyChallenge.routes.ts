import { Router } from "express";
import { startChallengeBodySchema } from "@app/shared";
import {
	getDailyChallengeLeaderboardController,
	getDailyChallengeSummaryController,
	startDailyChallengeController,
} from "../controllers/dailyChallenge.controller";
import { requireUserSession } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";

export const dailyChallengeRoutes = Router();

dailyChallengeRoutes.post(
	"/today/runs",
	requireUserSession,
	validateBody(startChallengeBodySchema),
	startDailyChallengeController,
);

dailyChallengeRoutes.get("/:date", getDailyChallengeSummaryController);

dailyChallengeRoutes.get("/:date/leaderboard", getDailyChallengeLeaderboardController);
