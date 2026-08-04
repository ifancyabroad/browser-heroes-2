import { beforeEach, describe, expect, it, vi } from "vitest";

const models = vi.hoisted(() => ({
	run: { find: vi.fn(), countDocuments: vi.fn() },
	ghost: { find: vi.fn(), countDocuments: vi.fn() },
}));

vi.mock("../models/run.model", () => ({ RunModel: models.run }));
vi.mock("../models/ghost.model", () => ({ GhostModel: models.ghost }));

import { getGhostLeaderboard, getRunLeaderboard } from "./leaderboard.service";

function arrangeQuery(find: ReturnType<typeof vi.fn>, rows: unknown[]) {
	const lean = vi.fn().mockResolvedValue(rows);
	const limit = vi.fn().mockReturnValue({ lean });
	const skip = vi.fn().mockReturnValue({ limit });
	const sort = vi.fn().mockReturnValue({ skip });
	find.mockReturnValue({ sort });
	return { sort, skip, limit, lean };
}

describe("leaderboard.service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		models.run.countDocuments.mockResolvedValue(0);
		models.ghost.countDocuments.mockResolvedValue(0);
		arrangeQuery(models.run.find, []);
		arrangeQuery(models.ghost.find, []);
	});

	it("queries completed runs using stable leaderboard ordering", async () => {
		const query = arrangeQuery(models.run.find, []);

		await getRunLeaderboard({
			query: { scope: "overall", page: 2, limit: 10 },
		});

		const filter = {
			status: { $in: ["dead", "retired"] },
			completedAt: { $ne: null },
		};
		expect(models.run.find).toHaveBeenCalledWith(filter);
		expect(models.run.countDocuments).toHaveBeenCalledWith(filter);
		expect(query.sort).toHaveBeenCalledWith({
			"summary.kills": -1,
			"summary.day": 1,
			completedAt: 1,
			_id: 1,
		});
		expect(query.skip).toHaveBeenCalledWith(10);
		expect(query.limit).toHaveBeenCalledWith(10);
	});

	it("applies an exact UTC day range and class filter", async () => {
		await getRunLeaderboard({
			query: {
				scope: "daily",
				date: "2026-07-24",
				classId: "warrior",
				page: 1,
				limit: 20,
			},
		});

		expect(models.run.find).toHaveBeenCalledWith({
			status: { $in: ["dead", "retired"] },
			completedAt: {
				$gte: new Date("2026-07-24T00:00:00.000Z"),
				$lt: new Date("2026-07-25T00:00:00.000Z"),
			},
			"summary.classId": "warrior",
		});
	});

	it("rejects a daily leaderboard without a date", async () => {
		await expect(
			getRunLeaderboard({
				query: { scope: "daily", page: 1, limit: 20 },
			}),
		).rejects.toThrow("DAILY_LEADERBOARD_REQUIRES_DATE");
		expect(models.run.find).not.toHaveBeenCalled();
	});

	it("restricts user-only runs to the current user", async () => {
		await getRunLeaderboard({
			userId: "user-id",
			query: { scope: "overall", userOnly: "true", page: 1, limit: 20 },
		});

		expect(models.run.find).toHaveBeenCalledWith(
			expect.objectContaining({ userId: "user-id" }),
		);
	});

	it("rejects user-only run queries without a user", async () => {
		await expect(
			getRunLeaderboard({
				query: { scope: "overall", userOnly: "true", page: 1, limit: 20 },
			}),
		).rejects.toThrow("UNAUTHENTICATED");
	});

	it("projects run entries, page-relative ranks, and pagination", async () => {
		arrangeQuery(models.run.find, [
			{
				_id: "run-id",
				userId: "user-id",
				status: "dead",
				summary: {
					heroName: "Hero",
					classId: "warrior",
					level: 4,
					battleNumber: 12,
					zoneNumber: 2,
					endlessCycle: 0,
					day: 3,
					kills: 9,
					slainBy: undefined,
				},
				completedAt: new Date("2026-07-24T12:00:00.000Z"),
			},
		]);
		models.run.countDocuments.mockResolvedValue(21);

		const result = await getRunLeaderboard({
			userId: "user-id",
			query: { scope: "overall", page: 2, limit: 10 },
		});

		expect(result).toEqual({
			entries: [
				{
					rank: 11,
					runId: "run-id",
					heroName: "Hero",
					classId: "warrior",
					level: 4,
					battleNumber: 12,
					zoneNumber: 2,
					endlessCycle: 0,
					day: 3,
					kills: 9,
					status: "dead",
					slainBy: null,
					completedAt: "2026-07-24T12:00:00.000Z",
					isCurrentUser: true,
				},
			],
			page: 2,
			limit: 10,
			total: 21,
			totalPages: 3,
		});
	});

	it("queries ghosts with filters and stable ordering", async () => {
		const query = arrangeQuery(models.ghost.find, []);

		await getGhostLeaderboard({
			userId: "user-id",
			query: {
				classId: "mage",
				userOnly: "true",
				page: 2,
				limit: 5,
			},
		});

		const filter = { classId: "mage", userId: "user-id" };
		expect(models.ghost.find).toHaveBeenCalledWith(filter);
		expect(models.ghost.countDocuments).toHaveBeenCalledWith(filter);
		expect(query.sort).toHaveBeenCalledWith({
			"stats.kills": -1,
			"stats.deaths": 1,
			"stats.encounters": -1,
			createdAt: 1,
			_id: 1,
		});
		expect(query.skip).toHaveBeenCalledWith(5);
	});

	it("rejects user-only ghost queries without a user", async () => {
		await expect(
			getGhostLeaderboard({
				query: { userOnly: "true", page: 1, limit: 20 },
			}),
		).rejects.toThrow("UNAUTHENTICATED");
	});

	it("projects ghost rankings and completed-combat win rates", async () => {
		arrangeQuery(models.ghost.find, [
			{
				_id: "ghost-id",
				userId: "other-user",
				name: "Shade",
				classId: "mage",
				heroLevel: 6,
				encounterLevel: 5,
				stats: { kills: 3, deaths: 1, encounters: 6 },
				createdAt: new Date("2026-07-20T00:00:00.000Z"),
			},
		]);
		models.ghost.countDocuments.mockResolvedValue(6);

		const result = await getGhostLeaderboard({
			userId: "user-id",
			query: { page: 2, limit: 5 },
		});

		expect(result.entries[0]).toEqual({
			rank: 6,
			ghostId: "ghost-id",
			name: "Shade",
			classId: "mage",
			heroLevel: 6,
			encounterLevel: 5,
			kills: 3,
			deaths: 1,
			encounters: 6,
			winRate: 0.75,
			createdAt: "2026-07-20T00:00:00.000Z",
			isCurrentUser: false,
		});
		expect(result.totalPages).toBe(2);
	});

	it("reports a zero win rate when a ghost has no completed combats", async () => {
		arrangeQuery(models.ghost.find, [
			{
				_id: "ghost-id",
				userId: "user-id",
				name: "Shade",
				classId: "mage",
				heroLevel: 1,
				encounterLevel: 1,
				stats: { kills: 0, deaths: 0, encounters: 2 },
				createdAt: new Date("2026-07-20T00:00:00.000Z"),
			},
		]);

		const result = await getGhostLeaderboard({
			query: { page: 1, limit: 20 },
		});

		expect(result.entries[0].winRate).toBe(0);
	});
});
