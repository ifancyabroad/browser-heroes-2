import { classes } from "@app/content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const runs = vi.hoisted(() => ({
	countDocuments: vi.fn(),
	find: vi.fn(),
	findOne: vi.fn(),
	exists: vi.fn(),
}));
const challenges = vi.hoisted(() => ({ findOne: vi.fn(), findOneAndUpdate: vi.fn() }));
const runService = vi.hoisted(() => ({ createDailyChallengeRun: vi.fn() }));

vi.mock("../models/run.model", () => ({ RunModel: runs }));
vi.mock("../models/dailyChallenge.model", () => ({ DailyChallengeModel: challenges }));
vi.mock("./run.service", () => runService);

import {
	DAILY_CHALLENGE_RANKING,
	deriveDailyChallengeDefinition,
	getDailyChallengeLeaderboard,
	getDailyChallengeSummary,
	startTodayDailyChallenge,
} from "./dailyChallenge.service";

const date = "2026-08-23";
const definition = {
	date,
	classId: "warrior",
	seed: "d47b9203-2ac8-8d97-a2ad-6e3f70c239d9",
};

describe("dailyChallenge.service", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-08-23T12:00:00.000Z"));
		vi.clearAllMocks();
		challenges.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(definition) });
		challenges.findOneAndUpdate.mockReturnValue({
			lean: vi.fn().mockResolvedValue(definition),
		});
		runs.countDocuments.mockResolvedValue(0);
		runs.exists.mockResolvedValue(null);
	});

	afterEach(() => vi.useRealTimers());

	it("rotates through classes in their authored order", () => {
		const orderedIds = [...classes].sort((a, b) => a.order - b.order).map(({ id }) => id);
		const actual = orderedIds.map((_, offset) => {
			const challengeDate = new Date(Date.UTC(2026, 0, 1 + offset))
				.toISOString()
				.slice(0, 10);
			return deriveDailyChallengeDefinition(challengeDate).classId;
		});
		expect(actual).toEqual(orderedIds);
	});

	it("derives a stable UUID seed for each date", () => {
		const seed = deriveDailyChallengeDefinition(date).seed;
		expect(seed).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
		);
		expect(deriveDailyChallengeDefinition(date).seed).toBe(seed);
		expect(deriveDailyChallengeDefinition("2026-08-24").seed).not.toBe(seed);
	});

	it("reports an available attempt without creating a challenge", async () => {
		runs.findOne
			.mockReturnValueOnce(rankedQuery(null))
			.mockReturnValueOnce({ lean: vi.fn().mockResolvedValue(null) });

		const result = await getDailyChallengeSummary({ date, userId: "user-id" });
		expect(result.challenge).toEqual({
			date,
			classId: "warrior",
			attemptCount: 0,
			leader: null,
			attempt: null,
			canStart: true,
		});
		expect(challenges.findOneAndUpdate).not.toHaveBeenCalled();
	});

	it("keeps abandoned attempts consumed and unranked", async () => {
		runs.findOne.mockReturnValueOnce(rankedQuery(null)).mockReturnValueOnce({
			lean: vi.fn().mockResolvedValue({ _id: "attempt-id", status: "abandoned" }),
		});

		const result = await getDailyChallengeSummary({ date, userId: "user-id" });
		expect(result.challenge.attempt).toEqual({
			runId: "attempt-id",
			status: "abandoned",
			rankedEntry: null,
		});
		expect(result.challenge.canStart).toBe(false);
	});

	it("atomically creates today's challenge when starting", async () => {
		runService.createDailyChallengeRun.mockResolvedValue({ _id: "run-id" });
		await startTodayDailyChallenge({ userId: "user-id", heroName: "Hero" });

		expect(challenges.findOneAndUpdate).toHaveBeenCalledWith(
			{ date },
			{ $setOnInsert: expect.objectContaining({ date }) },
			{ upsert: true, returnDocument: "after" },
		);
		expect(runService.createDailyChallengeRun).toHaveBeenCalledWith({
			userId: "user-id",
			heroName: "Hero",
			classId: definition.classId,
			seed: definition.seed,
			dailyChallengeDate: date,
		});
	});

	it("rejects a consumed attempt", async () => {
		runs.exists.mockResolvedValue({ _id: "attempt-id" });
		await expect(
			startTodayDailyChallenge({ userId: "user-id", heroName: "Hero" }),
		).rejects.toMatchObject({ message: "DAILY_ATTEMPT_USED", status: 409 });
		expect(runService.createDailyChallengeRun).not.toHaveBeenCalled();
	});

	it("uses the existing ranking order and stable pagination", async () => {
		const lean = vi.fn().mockResolvedValue([]);
		const limit = vi.fn().mockReturnValue({ lean });
		const skip = vi.fn().mockReturnValue({ limit });
		const sort = vi.fn().mockReturnValue({ skip });
		runs.find.mockReturnValue({ sort });
		runs.countDocuments.mockResolvedValue(21);

		const result = await getDailyChallengeLeaderboard({
			date,
			query: { page: 2, limit: 20 },
		});
		expect(sort).toHaveBeenCalledWith(DAILY_CHALLENGE_RANKING);
		expect(skip).toHaveBeenCalledWith(20);
		expect(limit).toHaveBeenCalledWith(20);
		expect(result).toMatchObject({ page: 2, total: 21, totalPages: 2 });
	});
});

function rankedQuery(value: unknown) {
	return { sort: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(value) }) };
}
