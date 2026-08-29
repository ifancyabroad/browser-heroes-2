import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const hallOfFameService = vi.hoisted(() => ({
	getHeroHallOfFame: vi.fn(),
	getGhostHallOfFame: vi.fn(),
}));
vi.mock("../services/hallOfFame.service", () => hallOfFameService);

describe("Hall of Fame routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => ({ buildApp } = await import("../app")));
	beforeEach(() => {
		vi.clearAllMocks();
		const empty = { entries: [], page: 1, limit: 20, total: 0, totalPages: 0 };
		hallOfFameService.getHeroHallOfFame.mockResolvedValue(empty);
		hallOfFameService.getGhostHallOfFame.mockResolvedValue(empty);
	});

	it("applies hero defaults", async () => {
		await request(buildApp()).get("/api/hall-of-fame/heroes").expect(200);
		expect(hallOfFameService.getHeroHallOfFame).toHaveBeenCalledWith({
			userId: undefined,
			query: { page: 1, limit: 20 },
		});
	});

	it("forwards class, ownership, and pagination filters", async () => {
		await request(buildApp())
			.get("/api/hall-of-fame/ghosts?classId=mage&userOnly=true&page=2&limit=10")
			.set("x-test-user-id", "507f1f77bcf86cd799439011")
			.expect(200);
		expect(hallOfFameService.getGhostHallOfFame).toHaveBeenCalledWith({
			userId: "507f1f77bcf86cd799439011",
			query: { classId: "mage", userOnly: "true", page: 2, limit: 10 },
		});
	});

	it.each(["heroes", "ghosts"])(
		"returns an empty page for unauthenticated my %s",
		async (endpoint) => {
			const service =
				endpoint === "heroes"
					? hallOfFameService.getHeroHallOfFame
					: hallOfFameService.getGhostHallOfFame;
			service.mockImplementation(({ query }: { query: { page: number; limit: number } }) => ({
				entries: [],
				page: query.page,
				limit: query.limit,
				total: 0,
				totalPages: 0,
			}));
			const response = await request(buildApp())
				.get(`/api/hall-of-fame/${endpoint}?userOnly=true&page=2&limit=10`)
				.expect(200);
			expect(response.body).toEqual({
				entries: [],
				page: 2,
				limit: 10,
				total: 0,
				totalPages: 0,
			});
			expect(service).toHaveBeenCalledWith({
				userId: undefined,
				query: { userOnly: "true", page: 2, limit: 10 },
			});
		},
	);

	it("rejects invalid pagination", async () => {
		await request(buildApp()).get("/api/hall-of-fame/heroes?page=0&limit=101").expect(400);
		expect(hallOfFameService.getHeroHallOfFame).not.toHaveBeenCalled();
	});
});
