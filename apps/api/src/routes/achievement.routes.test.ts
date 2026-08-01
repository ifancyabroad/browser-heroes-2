import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const achievementService = vi.hoisted(() => ({
	getAchievements: vi.fn(),
}));

vi.mock("../services/achievement.service", () => achievementService);

describe("achievement routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		achievementService.getAchievements.mockResolvedValue({ unlocks: [], progress: [] });
	});

	it("requires a user session", async () => {
		await request(buildApp()).get("/api/achievements").expect(401);
	});

	it("returns unlocks for the authenticated guest or account", async () => {
		const response = await request(buildApp())
			.get("/api/achievements")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(achievementService.getAchievements).toHaveBeenCalledWith("user-id");
		expect(response.body).toEqual({ unlocks: [], progress: [] });
	});
});
