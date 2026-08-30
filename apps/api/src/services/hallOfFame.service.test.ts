import { beforeEach, describe, expect, it, vi } from "vitest";

const models = vi.hoisted(() => ({
	runs: { find: vi.fn(), countDocuments: vi.fn() },
	ghosts: { find: vi.fn(), countDocuments: vi.fn() },
}));
vi.mock("../models/run.model", () => ({ RunModel: models.runs }));
vi.mock("../models/ghost.model", () => ({ GhostModel: models.ghosts }));

import { getGhostHallOfFame, getHeroHallOfFame } from "./hallOfFame.service";

const userId = "507f1f77bcf86cd799439011";

function arrangeQuery(find: ReturnType<typeof vi.fn>, rows: unknown[]) {
	const lean = vi.fn().mockResolvedValue(rows);
	const limit = vi.fn().mockReturnValue({ lean });
	const skip = vi.fn().mockReturnValue({ limit });
	const sort = vi.fn().mockReturnValue({ skip });
	find.mockReturnValue({ sort });
	return { sort, skip, limit };
}

describe("hallOfFame.service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		arrangeQuery(models.runs.find, []);
		arrangeQuery(models.ghosts.find, []);
		models.runs.countDocuments.mockResolvedValue(0);
		models.ghosts.countDocuments.mockResolvedValue(0);
	});

	it("queries and maps the paginated hero ranking", async () => {
		const query = arrangeQuery(models.runs.find, [
			{
				_id: "507f1f77bcf86cd799439012",
				userId,
				mode: "dailyChallenge",
				status: "dead",
				completedAt: new Date("2026-08-23T12:00:00.000Z"),
				summary: {
					heroName: "Ada",
					classId: "mage",
					level: 8,
					zoneNumber: 4,
					day: 3,
					kills: 31,
					slainBy: null,
				},
			},
		]);
		models.runs.countDocuments.mockResolvedValue(21);

		const response = await getHeroHallOfFame({
			userId,
			query: { classId: "mage", page: 2, limit: 10 },
		});

		const filter = {
			status: { $in: ["dead", "retired"] },
			completedAt: { $ne: null },
			"summary.classId": "mage",
		};
		expect(models.runs.find).toHaveBeenCalledWith(filter);
		expect(models.runs.countDocuments).toHaveBeenCalledWith(filter);
		expect(query.sort).toHaveBeenCalledWith({
			"summary.kills": -1,
			"summary.day": 1,
			completedAt: 1,
			_id: 1,
		});
		expect(query.skip).toHaveBeenCalledWith(10);
		expect(response).toEqual({
			entries: [
				{
					rank: 11,
					runId: "507f1f77bcf86cd799439012",
					heroName: "Ada",
					classId: "mage",
					level: 8,
					zoneNumber: 4,
					day: 3,
					kills: 31,
					status: "dead",
					mode: "dailyChallenge",
					slainBy: null,
					completedAt: "2026-08-23T12:00:00.000Z",
					isCurrentUser: true,
				},
			],
			page: 2,
			limit: 10,
			total: 21,
			totalPages: 3,
		});
	});

	it("preserves a hero's class rank when filtering to personal entries", async () => {
		arrangeQuery(models.runs.find, [
			{
				_id: "507f1f77bcf86cd799439012",
				userId,
				mode: "normal",
				status: "retired",
				completedAt: new Date("2026-08-23T12:00:00.000Z"),
				summary: {
					heroName: "Ada",
					classId: "mage",
					level: 8,
					zoneNumber: 4,
					day: 3,
					kills: 31,
					slainBy: null,
				},
			},
		]);
		models.runs.countDocuments.mockResolvedValueOnce(1).mockResolvedValueOnce(6);

		const response = await getHeroHallOfFame({
			userId,
			query: { classId: "mage", userOnly: "true", page: 1, limit: 20 },
		});

		expect(response.entries[0]?.rank).toBe(7);
		expect(models.runs.countDocuments).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({
				"summary.classId": "mage",
				$or: expect.any(Array),
			}),
		);
		expect(models.runs.countDocuments.mock.calls[1]![0]).not.toHaveProperty("userId");
	});

	it("maps ghost statistics and preserves personal ranks", async () => {
		arrangeQuery(models.ghosts.find, [
			{
				_id: "507f1f77bcf86cd799439013",
				userId,
				name: "Shade",
				classId: "rogue",
				heroLevel: 6,
				createdAt: new Date("2026-08-23T12:00:00.000Z"),
				status: "banished",
				banishedBy: {
					sourceId: "banisher-run-id",
					heroName: "Dawn",
					classId: "priest",
					heroLevel: 7,
				},
				stats: { kills: 3, deaths: 1, encounters: 5 },
			},
		]);
		models.ghosts.countDocuments.mockResolvedValueOnce(1).mockResolvedValueOnce(3);

		const response = await getGhostHallOfFame({
			userId,
			query: { userOnly: "true", page: 1, limit: 20 },
		});

		expect(response.entries[0]).toEqual({
			rank: 4,
			ghostId: "507f1f77bcf86cd799439013",
			name: "Shade",
			classId: "rogue",
			heroLevel: 6,
			kills: 3,
			status: "banished",
			banishedBy: {
				sourceId: "banisher-run-id",
				heroName: "Dawn",
				classId: "priest",
				heroLevel: 7,
			},
			isCurrentUser: true,
		});
		expect(models.ghosts.countDocuments.mock.calls[1]![0]).toMatchObject({
			$or: expect.any(Array),
		});
		expect(models.ghosts.countDocuments.mock.calls[1]![0]).not.toHaveProperty("userId");
	});

	it.each(["hero", "ghost"] as const)(
		"returns an empty %s page for an unauthenticated personal query",
		async (entryType) => {
			const query = { userOnly: "true" as const, page: 2, limit: 10 };
			const response =
				entryType === "hero"
					? await getHeroHallOfFame({ query })
					: await getGhostHallOfFame({ query });

			expect(response).toEqual({
				entries: [],
				page: 2,
				limit: 10,
				total: 0,
				totalPages: 0,
			});
			expect(models.runs.find).not.toHaveBeenCalled();
			expect(models.ghosts.find).not.toHaveBeenCalled();
		},
	);
});
