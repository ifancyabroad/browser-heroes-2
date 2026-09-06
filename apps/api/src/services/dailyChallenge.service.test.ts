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
const identities = vi.hoisted(() => ({ getRegisteredDisplayNames: vi.fn() }));

vi.mock("../models/run.model", () => ({ RunModel: runs }));
vi.mock("../models/dailyChallenge.model", () => ({ DailyChallengeModel: challenges }));
vi.mock("./run.service", () => runService);
vi.mock("./publicIdentity.service", () => identities);

import {
	DAILY_CHALLENGE_RANKING,
	deriveDailyChallengeDefinition,
	getDailyChallengeLeaderboard,
	getDailyChallengeSummary,
	startTodayDailyChallenge,
} from "./dailyChallenge.service";

const date = "2026-08-23";
const definition = {
	season: 1,
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
		identities.getRegisteredDisplayNames.mockResolvedValue(new Map());
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
		const derived = deriveDailyChallengeDefinition(date);
		const seed = derived.seed;
		expect(derived).not.toHaveProperty("season");
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
		expect(runs.countDocuments).toHaveBeenCalledWith({
			mode: "dailyChallenge",
			dailyChallengeDate: date,
			status: { $in: ["dead", "retired"] },
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

	it("adds the registered display name to the leader and ranked attempt", async () => {
		const attempt = createRankedAttempt();
		runs.findOne
			.mockReturnValueOnce(rankedQuery(attempt))
			.mockReturnValueOnce({ lean: vi.fn().mockResolvedValue(attempt) });
		runs.countDocuments.mockResolvedValueOnce(1).mockResolvedValueOnce(0);
		identities.getRegisteredDisplayNames.mockResolvedValue(new Map([["user-id", "Player"]]));

		const result = await getDailyChallengeSummary({ date, userId: "user-id" });

		expect(result.challenge.leader?.displayName).toBe("Player");
		expect(result.challenge.attempt?.rankedEntry?.displayName).toBe("Player");
		expect(identities.getRegisteredDisplayNames).toHaveBeenCalledOnce();
		expect(identities.getRegisteredDisplayNames).toHaveBeenCalledWith(["user-id", "user-id"]);
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
			season: 1,
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
		expect(result.currentUserEntry).toBeNull();
	});

	it("pins the current user's completed attempt with its global rank", async () => {
		const attempt = createRankedAttempt();
		identities.getRegisteredDisplayNames.mockResolvedValue(new Map([["user-id", "Player"]]));
		mockLeaderboardRuns([]);
		runs.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(attempt) });
		runs.countDocuments.mockResolvedValueOnce(25).mockResolvedValueOnce(7);

		const result = await getDailyChallengeLeaderboard({
			date,
			userId: "user-id",
			query: { page: 2, limit: 20 },
		});

		expect(result.currentUserEntry).toMatchObject({
			rank: 8,
			runId: "507f1f77bcf86cd799439011",
			heroName: "Pinned Hero",
			displayName: "Player",
			isCurrentUser: true,
		});
		expect(result.entries).toEqual([]);
	});

	it("keeps the user's natural leaderboard row alongside the pinned result", async () => {
		const attempt = createRankedAttempt();
		identities.getRegisteredDisplayNames.mockResolvedValue(new Map([["user-id", "Player"]]));
		mockLeaderboardRuns([attempt]);
		runs.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(attempt) });
		runs.countDocuments.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

		const result = await getDailyChallengeLeaderboard({
			date,
			userId: "user-id",
			query: { page: 1, limit: 20 },
		});

		expect(result.currentUserEntry?.runId).toBe(attempt._id);
		expect(result.entries).toHaveLength(1);
		expect(result.entries[0]?.runId).toBe(attempt._id);
		expect(result.currentUserEntry?.displayName).toBe("Player");
		expect(result.entries[0]?.displayName).toBe("Player");
		expect(identities.getRegisteredDisplayNames).toHaveBeenCalledOnce();
	});

	it.each(["active", "abandoned"])("does not pin an unranked %s attempt", async (status) => {
		mockLeaderboardRuns([]);
		runs.findOne.mockReturnValue({
			lean: vi.fn().mockResolvedValue({ ...createRankedAttempt(), status }),
		});

		const result = await getDailyChallengeLeaderboard({
			date,
			userId: "user-id",
			query: { page: 1, limit: 20 },
		});

		expect(result.currentUserEntry).toBeNull();
	});

	it("does not pin a result when the current user has no attempt", async () => {
		mockLeaderboardRuns([]);
		runs.findOne.mockReturnValue({ lean: vi.fn().mockResolvedValue(null) });

		const result = await getDailyChallengeLeaderboard({
			date,
			userId: "user-id",
			query: { page: 1, limit: 20 },
		});

		expect(result.currentUserEntry).toBeNull();
	});

	it("does not query for a pinned attempt for an anonymous viewer", async () => {
		mockLeaderboardRuns([]);

		const result = await getDailyChallengeLeaderboard({
			date,
			query: { page: 1, limit: 20 },
		});

		expect(runs.findOne).not.toHaveBeenCalled();
		expect(result.currentUserEntry).toBeNull();
	});
});

function rankedQuery(value: unknown) {
	return { sort: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(value) }) };
}

function mockLeaderboardRuns(value: unknown[]) {
	const lean = vi.fn().mockResolvedValue(value);
	const limit = vi.fn().mockReturnValue({ lean });
	const skip = vi.fn().mockReturnValue({ limit });
	runs.find.mockReturnValue({ sort: vi.fn().mockReturnValue({ skip }) });
}

function createRankedAttempt() {
	return {
		_id: "507f1f77bcf86cd799439011",
		userId: "user-id",
		mode: "dailyChallenge",
		dailyChallengeDate: date,
		status: "dead",
		completedAt: new Date("2026-08-23T12:00:00.000Z"),
		summary: {
			heroName: "Pinned Hero",
			classId: "warrior",
			level: 4,
			battleNumber: 9,
			zoneNumber: 2,
			endlessCycle: 0,
			day: 3,
			kills: 8,
			slainBy: null,
		},
	};
}
