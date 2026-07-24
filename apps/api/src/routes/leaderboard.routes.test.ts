import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const leaderboardService = vi.hoisted(() => ({
	getRunLeaderboard: vi.fn(),
	getGhostLeaderboard: vi.fn(),
}));

vi.mock("../services/leaderboard.service", () => leaderboardService);

describe("leaderboard routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		leaderboardService.getRunLeaderboard.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
		leaderboardService.getGhostLeaderboard.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
	});

	it("applies run leaderboard defaults", async () => {
		const response = await request(buildApp()).get("/api/leaderboard/runs").expect(200);

		expect(leaderboardService.getRunLeaderboard).toHaveBeenCalledWith({
			userId: undefined,
			query: { scope: "overall", page: 1, limit: 20 },
		});
		expect(response.body.entries).toEqual([]);
	});

	it("coerces and forwards run leaderboard filters", async () => {
		await request(buildApp())
			.get(
				"/api/leaderboard/runs?scope=daily&date=2026-07-24&classId=fighter&page=2&limit=10",
			)
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(leaderboardService.getRunLeaderboard).toHaveBeenCalledWith({
			userId: "user-id",
			query: {
				scope: "daily",
				date: "2026-07-24",
				classId: "fighter",
				page: 2,
				limit: 10,
			},
		});
	});

	it("requires a date for daily run leaderboards", async () => {
		const response = await request(buildApp())
			.get("/api/leaderboard/runs?scope=daily")
			.expect(400);

		expect(response.body.error).toBe("ValidationError");
		expect(leaderboardService.getRunLeaderboard).not.toHaveBeenCalled();
	});

	it("requires authentication for user-only run entries", async () => {
		const response = await request(buildApp())
			.get("/api/leaderboard/runs?userOnly=true")
			.expect(401);

		expect(response.body.error).toBe("UNAUTHENTICATED");
		expect(leaderboardService.getRunLeaderboard).not.toHaveBeenCalled();
	});

	it("rejects invalid run leaderboard pagination", async () => {
		await request(buildApp()).get("/api/leaderboard/runs?page=0&limit=101").expect(400);

		expect(leaderboardService.getRunLeaderboard).not.toHaveBeenCalled();
	});

	it("applies ghost leaderboard defaults", async () => {
		await request(buildApp()).get("/api/leaderboard/ghosts").expect(200);

		expect(leaderboardService.getGhostLeaderboard).toHaveBeenCalledWith({
			userId: undefined,
			query: { page: 1, limit: 20 },
		});
	});

	it("forwards authenticated ghost leaderboard filters", async () => {
		await request(buildApp())
			.get("/api/leaderboard/ghosts?classId=mage&userOnly=true&page=3&limit=5")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(leaderboardService.getGhostLeaderboard).toHaveBeenCalledWith({
			userId: "user-id",
			query: { classId: "mage", userOnly: "true", page: 3, limit: 5 },
		});
	});

	it("requires authentication for user-only ghost entries", async () => {
		await request(buildApp()).get("/api/leaderboard/ghosts?userOnly=true").expect(401);

		expect(leaderboardService.getGhostLeaderboard).not.toHaveBeenCalled();
	});
});
