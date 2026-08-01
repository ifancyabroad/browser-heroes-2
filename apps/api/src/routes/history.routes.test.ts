import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const historyService = vi.hoisted(() => ({
	getRunHistory: vi.fn(),
	getGhostHistory: vi.fn(),
}));

vi.mock("../services/history.service", () => historyService);

describe("history routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		historyService.getRunHistory.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
		historyService.getGhostHistory.mockResolvedValue({
			entries: [],
			page: 1,
			limit: 20,
			total: 0,
			totalPages: 0,
		});
	});

	it.each(["runs", "ghosts"])("protects the %s endpoint", async (endpoint) => {
		await request(buildApp()).get(`/api/history/${endpoint}`).expect(401);
	});

	it("applies run history defaults", async () => {
		await request(buildApp())
			.get("/api/history/runs")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(historyService.getRunHistory).toHaveBeenCalledWith({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "completedAt", direction: "desc" },
		});
	});

	it("coerces, trims, and forwards run history filters", async () => {
		await request(buildApp())
			.get(
				"/api/history/runs?page=2&limit=5&classId=fighter&search=%20Hero%20&sort=kills&direction=asc",
			)
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(historyService.getRunHistory).toHaveBeenCalledWith({
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

	it("rejects invalid run history filters", async () => {
		await request(buildApp())
			.get("/api/history/runs?search=%20%20&sort=unknown")
			.set("x-test-user-id", "user-id")
			.expect(400);

		expect(historyService.getRunHistory).not.toHaveBeenCalled();
	});

	it("applies ghost history defaults", async () => {
		await request(buildApp())
			.get("/api/history/ghosts")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(historyService.getGhostHistory).toHaveBeenCalledWith({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "createdAt", direction: "desc" },
		});
	});

	it("forwards ghost history filters", async () => {
		await request(buildApp())
			.get("/api/history/ghosts?classId=mage&search=Shade&sort=encounters&direction=asc")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(historyService.getGhostHistory).toHaveBeenCalledWith({
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

	it("rejects invalid ghost history pagination", async () => {
		await request(buildApp())
			.get("/api/history/ghosts?limit=0")
			.set("x-test-user-id", "user-id")
			.expect(400);

		expect(historyService.getGhostHistory).not.toHaveBeenCalled();
	});

	it("does not expose removed stats or summary endpoints", async () => {
		await request(buildApp()).get("/api/stats/runs").expect(404);
		await request(buildApp()).get("/api/history/summary").expect(404);
	});
});
