import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const statsService = vi.hoisted(() => ({
	getRunStats: vi.fn(),
	getGhostStats: vi.fn(),
	getUserStatsSummary: vi.fn(),
}));

vi.mock("../services/stats.service", () => statsService);

describe("stats routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		statsService.getRunStats.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
		statsService.getGhostStats.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
		statsService.getUserStatsSummary.mockResolvedValue({ summary: {} });
	});

	it.each(["summary", "runs", "ghosts"])("protects the %s endpoint", async (endpoint) => {
		await request(buildApp()).get(`/api/stats/${endpoint}`).expect(401);
	});

	it("returns the authenticated user's summary", async () => {
		const response = await request(buildApp())
			.get("/api/stats/summary")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(statsService.getUserStatsSummary).toHaveBeenCalledWith("user-id");
		expect(response.body).toEqual({ summary: {} });
	});

	it("applies run stats defaults", async () => {
		await request(buildApp())
			.get("/api/stats/runs")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(statsService.getRunStats).toHaveBeenCalledWith({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "completedAt", direction: "desc" },
		});
	});

	it("coerces, trims, and forwards run stats filters", async () => {
		await request(buildApp())
			.get(
				"/api/stats/runs?page=2&limit=5&classId=fighter&search=%20Hero%20&sort=kills&direction=asc",
			)
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(statsService.getRunStats).toHaveBeenCalledWith({
			userId: "user-id",
			query: {
				page: 2,
				limit: 5,
				classId: "fighter",
				search: "Hero",
				sort: "kills",
				direction: "asc",
			},
		});
	});

	it("rejects invalid run stats filters", async () => {
		await request(buildApp())
			.get("/api/stats/runs?search=%20%20&sort=unknown")
			.set("x-test-user-id", "user-id")
			.expect(400);

		expect(statsService.getRunStats).not.toHaveBeenCalled();
	});

	it("applies ghost stats defaults", async () => {
		await request(buildApp())
			.get("/api/stats/ghosts")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(statsService.getGhostStats).toHaveBeenCalledWith({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "createdAt", direction: "desc" },
		});
	});

	it("forwards ghost stats filters", async () => {
		await request(buildApp())
			.get("/api/stats/ghosts?classId=mage&search=Shade&sort=encounters&direction=asc")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(statsService.getGhostStats).toHaveBeenCalledWith({
			userId: "user-id",
			query: {
				page: 1,
				limit: 20,
				classId: "mage",
				search: "Shade",
				sort: "encounters",
				direction: "asc",
			},
		});
	});

	it("rejects invalid ghost stats pagination", async () => {
		await request(buildApp())
			.get("/api/stats/ghosts?limit=0")
			.set("x-test-user-id", "user-id")
			.expect(400);

		expect(statsService.getGhostStats).not.toHaveBeenCalled();
	});
});
