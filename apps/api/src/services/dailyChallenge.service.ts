import { createHash } from "node:crypto";
import { Types } from "mongoose";
import { classes, type ClassId } from "@app/content";
import type { ChallengeLeaderboardQuery, RunStatus } from "@app/shared";
import { env } from "../config/env";
import { DailyChallengeModel } from "../models/dailyChallenge.model";
import { RunModel, type RunDocument } from "../models/run.model";
import { createDailyChallengeRun } from "./run.service";
import { toChallengeEntry } from "./projection.service";
import { getRegisteredDisplayNames } from "./publicIdentity.service";

const DAY_MS = 86_400_000;
const ROTATION_EPOCH = Date.UTC(2026, 0, 1);
const SEED_NAMESPACE = "browser-heroes-2:daily-challenge";
const orderedClassIds = [...classes].sort((a, b) => a.order - b.order).map(({ id }) => id);

export const DAILY_CHALLENGE_RANKING = {
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
} as const;

type ChallengeDefinition = {
	date: string;
	seed: string;
	classId: ClassId;
};

export async function getDailyChallengeSummary(input: { date: string; userId?: string }) {
	assertChallengeDateIsNotFuture(input.date);

	const definition = await getDailyChallengeDefinition(input.date);
	const rankedFilter = getRankedDailyRunFilter(input.date);

	const [attemptCount, leader, attempt] = await Promise.all([
		RunModel.countDocuments(rankedFilter),
		RunModel.findOne(rankedFilter).sort(DAILY_CHALLENGE_RANKING).lean(),
		getDailyChallengeAttempt(input.date, input.userId),
	]);

	const rankedAttempt = await getRankedChallengeAttempt(input.date, attempt);
	const displayNames = await getRegisteredDisplayNames([
		leader?.userId,
		rankedAttempt?.run.userId,
	]);
	const leaderEntry = leader
		? projectChallengeEntry(leader, 1, input.userId, displayNames)
		: null;
	const rankedEntry = rankedAttempt
		? projectChallengeEntry(rankedAttempt.run, rankedAttempt.rank, input.userId, displayNames)
		: null;

	return {
		challenge: {
			date: input.date,
			classId: definition.classId,
			attemptCount,
			leader: leaderEntry,
			attempt: attempt
				? {
						runId: String(attempt._id),
						status: attempt.status as RunStatus,
						rankedEntry,
					}
				: null,
			canStart: input.date === getTodayUtc() && !attempt,
		},
	};
}

export async function getDailyChallengeLeaderboard(input: {
	date: string;
	userId?: string;
	query: ChallengeLeaderboardQuery;
}) {
	assertChallengeDateIsNotFuture(input.date);

	const definition = await getDailyChallengeDefinition(input.date);
	const filter = getRankedDailyRunFilter(input.date);
	const skip = (input.query.page - 1) * input.query.limit;

	const [runs, total, attempt] = await Promise.all([
		RunModel.find(filter)
			.sort(DAILY_CHALLENGE_RANKING)
			.skip(skip)
			.limit(input.query.limit)
			.lean(),
		RunModel.countDocuments(filter),
		getDailyChallengeAttempt(input.date, input.userId),
	]);

	const rankedAttempt = await getRankedChallengeAttempt(input.date, attempt);
	const displayNames = await getRegisteredDisplayNames([
		...runs.map((run) => run.userId),
		rankedAttempt?.run.userId,
	]);
	const currentUserEntry = rankedAttempt
		? projectChallengeEntry(rankedAttempt.run, rankedAttempt.rank, input.userId, displayNames)
		: null;
	const entries = runs.map((run, index) =>
		projectChallengeEntry(run, skip + index + 1, input.userId, displayNames),
	);

	return {
		challenge: { date: input.date, classId: definition.classId },
		currentUserEntry,
		entries,
		page: input.query.page,
		limit: input.query.limit,
		total,
		totalPages: Math.ceil(total / input.query.limit),
	};
}

export async function startTodayDailyChallenge(input: { userId: string; heroName: string }) {
	const definition = await materializeTodayChallenge();

	const existing = await RunModel.exists({
		userId: input.userId,
		mode: "dailyChallenge",
		dailyChallengeDate: definition.date,
	});

	if (existing) {
		throw dailyAttemptUsedError();
	}

	try {
		return await createDailyChallengeRun({
			season: definition.season,
			userId: input.userId,
			heroName: input.heroName,
			classId: definition.classId,
			seed: definition.seed,
			dailyChallengeDate: definition.date,
		});
	} catch (error) {
		if (isDailyAttemptDuplicate(error)) {
			throw dailyAttemptUsedError();
		}

		throw error;
	}
}

function isRankedAttempt(run: { status: string; completedAt?: Date | null }): boolean {
	return (run.status === "dead" || run.status === "retired") && Boolean(run.completedAt);
}

function getDailyChallengeAttempt(date: string, userId?: string) {
	if (!userId) {
		return null;
	}

	return RunModel.findOne({
		userId,
		mode: "dailyChallenge",
		dailyChallengeDate: date,
	}).lean();
}

async function getRankedChallengeAttempt(
	date: string,
	attempt: (RunDocument & { _id: unknown }) | null,
) {
	if (!attempt || !isRankedAttempt(attempt)) {
		return null;
	}

	const rank = await getDailyChallengeRank(date, attempt);
	return { run: attempt, rank };
}

function projectChallengeEntry(
	run: RunDocument & { _id: unknown },
	rank: number,
	currentUserId: string | undefined,
	displayNames: ReadonlyMap<string, string>,
) {
	return toChallengeEntry(run, rank, currentUserId, displayNames.get(String(run.userId)) ?? null);
}

export function getTodayUtc(now = new Date()): string {
	return now.toISOString().slice(0, 10);
}

export function deriveDailyChallengeDefinition(date: string): ChallengeDefinition {
	const day = Math.floor((Date.parse(`${date}T00:00:00.000Z`) - ROTATION_EPOCH) / DAY_MS);
	const classIndex =
		((day % orderedClassIds.length) + orderedClassIds.length) % orderedClassIds.length;

	return {
		date,
		seed: deriveDailyChallengeSeed(date),
		classId: orderedClassIds[classIndex],
	};
}

function deriveDailyChallengeSeed(date: string): string {
	const bytes = createHash("sha256").update(`${SEED_NAMESPACE}:${date}`).digest().subarray(0, 16);

	bytes[6] = (bytes[6] & 0x0f) | 0x80;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	const hex = bytes.toString("hex");

	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

async function getDailyChallengeDefinition(date: string): Promise<ChallengeDefinition> {
	const challenge = await DailyChallengeModel.findOne({ date }).lean();

	return challenge
		? {
				date: challenge.date,
				seed: challenge.seed,
				classId: challenge.classId,
			}
		: deriveDailyChallengeDefinition(date);
}

async function materializeTodayChallenge(now = new Date()) {
	const date = getTodayUtc(now);
	const definition = deriveDailyChallengeDefinition(date);

	const challenge = await DailyChallengeModel.findOneAndUpdate(
		{ date },
		{
			$setOnInsert: {
				season: env.CURRENT_SEASON,
				date,
				seed: definition.seed,
				classId: definition.classId,
			},
		},
		{ upsert: true, returnDocument: "after" },
	).lean();

	if (!challenge) {
		throw new Error("DAILY_CHALLENGE_CREATE_FAILED");
	}

	return {
		season: challenge.season,
		date: challenge.date,
		seed: challenge.seed,
		classId: challenge.classId,
	};
}

function assertChallengeDateIsNotFuture(date: string, now = new Date()): void {
	if (date > getTodayUtc(now)) {
		throw Object.assign(new Error("DAILY_CHALLENGE_NOT_AVAILABLE"), { status: 404 });
	}
}

function getRankedDailyRunFilter(date: string) {
	return {
		mode: "dailyChallenge",
		dailyChallengeDate: date,
		status: { $in: ["dead", "retired"] as const },
	} as const;
}

async function getDailyChallengeRank(
	date: string,
	run: RunDocument & { _id: unknown },
): Promise<number> {
	const completedAt = run.completedAt!;
	const id = new Types.ObjectId(String(run._id));

	const betterRuns = await RunModel.countDocuments({
		...getRankedDailyRunFilter(date),
		$or: [
			{ "summary.kills": { $gt: run.summary.kills } },
			{ "summary.kills": run.summary.kills, "summary.day": { $lt: run.summary.day } },
			{
				"summary.kills": run.summary.kills,
				"summary.day": run.summary.day,
				completedAt: { $lt: completedAt },
			},
			{
				"summary.kills": run.summary.kills,
				"summary.day": run.summary.day,
				completedAt,
				_id: { $lt: id },
			},
		],
	});

	return betterRuns + 1;
}

function dailyAttemptUsedError() {
	return Object.assign(new Error("DAILY_ATTEMPT_USED"), { status: 409 });
}

function isDailyAttemptDuplicate(error: unknown): boolean {
	if (typeof error !== "object" || error === null || !("code" in error) || error.code !== 11000) {
		return false;
	}

	return (
		"keyPattern" in error &&
		typeof error.keyPattern === "object" &&
		error.keyPattern !== null &&
		"dailyChallengeDate" in error.keyPattern
	);
}
