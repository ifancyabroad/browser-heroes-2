import type { Request, Response } from "express";
import type {
	GetChallengeLeaderboardResponse,
	GetChallengeSummaryResponse,
	StartChallengeBody,
	StartChallengeResponse,
} from "@app/shared";
import { challengeLeaderboardQuerySchema, dailyChallengeDateSchema } from "@app/shared";
import {
	getDailyChallengeLeaderboard,
	getDailyChallengeSummary,
	startTodayDailyChallenge,
} from "../services/dailyChallenge.service";
import { toRunView } from "../services/projection.service";

export async function getDailyChallengeSummaryController(
	req: Request<{ date: string }>,
	res: Response<GetChallengeSummaryResponse>,
) {
	const date = dailyChallengeDateSchema.parse(req.params.date);

	res.status(200).json(await getDailyChallengeSummary({ date, userId: req.session.userId }));
}

export async function getDailyChallengeLeaderboardController(
	req: Request<{ date: string }>,
	res: Response<GetChallengeLeaderboardResponse>,
) {
	const date = dailyChallengeDateSchema.parse(req.params.date);
	const query = challengeLeaderboardQuerySchema.parse(req.query);

	res.status(200).json(
		await getDailyChallengeLeaderboard({ date, userId: req.session.userId, query }),
	);
}

export async function startDailyChallengeController(
	req: Request<never, StartChallengeResponse, StartChallengeBody>,
	res: Response<StartChallengeResponse>,
) {
	const run = await startTodayDailyChallenge({
		userId: req.session.userId!,
		heroName: req.body.heroName,
	});

	res.status(201).json({ run: toRunView(run) });
}
