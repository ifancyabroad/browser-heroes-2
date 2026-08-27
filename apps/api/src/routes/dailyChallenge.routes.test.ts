import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createTestRunDocument } from "../test/createTestRun";

const challengeService = vi.hoisted(() => ({
	getDailyChallengeLeaderboard: vi.fn(),
	getDailyChallengeSummary: vi.fn(),
	startTodayDailyChallenge: vi.fn(),
}));

vi.mock("../services/dailyChallenge.service", () => challengeService);

describe("daily challenge routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		challengeService.getDailyChallengeSummary.mockResolvedValue({ challenge: createSummary() });
		challengeService.getDailyChallengeLeaderboard.mockResolvedValue({
			challenge: { date: "2026-08-23", classId: "warrior" },
			currentUserEntry: null,
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
		challengeService.startTodayDailyChallenge.mockResolvedValue(
			createTestRunDocument({
				mode: "dailyChallenge",
				dailyChallengeDate: "2026-08-23",
			}),
		);
	});

	it("serves challenge metadata for a UTC date", async () => {
		await request(buildApp()).get("/api/daily-challenges/2026-08-23").expect(200);
		expect(challengeService.getDailyChallengeSummary).toHaveBeenCalledWith({
			date: "2026-08-23",
			userId: undefined,
		});
	});

	it("serves a separately paginated leaderboard", async () => {
		await request(buildApp())
			.get("/api/daily-challenges/2026-08-23/leaderboard?page=2&limit=10")
			.set("x-test-user-id", "user-id")
			.expect(200);
		expect(challengeService.getDailyChallengeLeaderboard).toHaveBeenCalledWith({
			date: "2026-08-23",
			userId: "user-id",
			query: { page: 2, limit: 10 },
		});
	});

	it("rejects invalid dates", async () => {
		await request(buildApp()).get("/api/daily-challenges/not-a-date").expect(400);
		expect(challengeService.getDailyChallengeSummary).not.toHaveBeenCalled();
	});

	it("requires a session and valid hero name to start", async () => {
		await request(buildApp())
			.post("/api/daily-challenges/today/runs")
			.send({ heroName: "Hero" })
			.expect(401);
		await request(buildApp())
			.post("/api/daily-challenges/today/runs")
			.set("x-test-user-id", "user-id")
			.send({ heroName: "" })
			.expect(400);
		expect(challengeService.startTodayDailyChallenge).not.toHaveBeenCalled();
	});

	it("starts today's challenge for the current user", async () => {
		const response = await request(buildApp())
			.post("/api/daily-challenges/today/runs")
			.set("x-test-user-id", "user-id")
			.send({ heroName: "Hero" })
			.expect(201);
		expect(challengeService.startTodayDailyChallenge).toHaveBeenCalledWith({
			userId: "user-id",
			heroName: "Hero",
		});
		expect(response.body.run.mode).toBe("dailyChallenge");
	});
});

function createSummary() {
	return {
		date: "2026-08-23",
		classId: "warrior" as const,
		attemptCount: 0,
		leader: null,
		attempt: null,
		canStart: true,
	};
}
