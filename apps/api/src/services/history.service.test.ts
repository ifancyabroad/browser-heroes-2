import { beforeEach, describe, expect, it, vi } from "vitest";

const models = vi.hoisted(() => ({
	run: {
		find: vi.fn(),
		countDocuments: vi.fn(),
	},
	ghost: {
		find: vi.fn(),
		countDocuments: vi.fn(),
	},
}));

vi.mock("../models/run.model", () => ({ RunModel: models.run }));
vi.mock("../models/ghost.model", () => ({ GhostModel: models.ghost }));

import { getGhostHistory, getRunHistory } from "./history.service";

function arrangeQuery(find: ReturnType<typeof vi.fn>, rows: unknown[]) {
	const lean = vi.fn().mockResolvedValue(rows);
	const limit = vi.fn().mockReturnValue({ lean });
	const skip = vi.fn().mockReturnValue({ limit });
	const sort = vi.fn().mockReturnValue({ skip });
	find.mockReturnValue({ sort });
	return { sort, skip, limit };
}

describe("history.service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		models.run.countDocuments.mockResolvedValue(0);
		models.ghost.countDocuments.mockResolvedValue(0);
		arrangeQuery(models.run.find, []);
		arrangeQuery(models.ghost.find, []);
	});

	it("queries only the user's completed runs", async () => {
		const query = arrangeQuery(models.run.find, []);

		await getRunHistory({
			userId: "user-id",
			query: {
				page: 2,
				limit: 10,
				sort: "completedAt",
				direction: "desc",
			},
		});

		const filter = {
			userId: "user-id",
			status: { $in: ["dead", "retired"] },
			completedAt: { $ne: null },
		};
		expect(models.run.find).toHaveBeenCalledWith(filter);
		expect(models.run.countDocuments).toHaveBeenCalledWith(filter);
		expect(query.sort).toHaveBeenCalledWith({ completedAt: -1, _id: 1 });
		expect(query.skip).toHaveBeenCalledWith(10);
		expect(query.limit).toHaveBeenCalledWith(10);
	});

	it("applies class and escaped case-insensitive hero search filters", async () => {
		await getRunHistory({
			userId: "user-id",
			query: {
				page: 1,
				limit: 20,
				classId: "fighter",
				search: "Hero.*(one)",
				sort: "heroName",
				direction: "asc",
			},
		});

		expect(models.run.find).toHaveBeenCalledWith(
			expect.objectContaining({
				"summary.classId": "fighter",
				"summary.heroName": {
					$regex: "Hero\\.\\*\\(one\\)",
					$options: "i",
				},
			}),
		);
	});

	it.each([
		["battleNumber", "summary.battleNumber"],
		["kills", "summary.kills"],
		["level", "summary.level"],
	] as const)("maps run sort %s to %s", async (sort, field) => {
		const query = arrangeQuery(models.run.find, []);

		await getRunHistory({
			userId: "user-id",
			query: { page: 1, limit: 20, sort, direction: "asc" },
		});

		expect(query.sort).toHaveBeenCalledWith({ [field]: 1, _id: 1 });
	});

	it("projects run entries and pagination", async () => {
		arrangeQuery(models.run.find, [
			{
				_id: "run-id",
				status: "retired",
				summary: {
					heroName: "Hero",
					classId: "fighter",
					level: 8,
					battleNumber: 30,
					zoneNumber: 4,
					endlessCycle: 2,
					day: 7,
					kills: 25,
				},
				createdAt: new Date("2026-07-01T00:00:00.000Z"),
				completedAt: new Date("2026-07-02T00:00:00.000Z"),
			},
		]);
		models.run.countDocuments.mockResolvedValue(21);

		const result = await getRunHistory({
			userId: "user-id",
			query: { page: 2, limit: 10, sort: "day", direction: "desc" },
		});

		expect(result).toEqual({
			entries: [
				{
					runId: "run-id",
					heroName: "Hero",
					classId: "fighter",
					level: 8,
					battleNumber: 30,
					zoneNumber: 4,
					endlessCycle: 2,
					day: 7,
					kills: 25,
					status: "retired",
					createdAt: "2026-07-01T00:00:00.000Z",
					completedAt: "2026-07-02T00:00:00.000Z",
				},
			],
			page: 2,
			limit: 10,
			total: 21,
			totalPages: 3,
		});
	});

	it("queries user ghosts with filters and mapped sorting", async () => {
		const query = arrangeQuery(models.ghost.find, []);

		await getGhostHistory({
			userId: "user-id",
			query: {
				page: 2,
				limit: 5,
				classId: "mage",
				search: "Shade+",
				sort: "encounters",
				direction: "desc",
			},
		});

		const filter = {
			userId: "user-id",
			classId: "mage",
			name: { $regex: "Shade\\+", $options: "i" },
		};
		expect(models.ghost.find).toHaveBeenCalledWith(filter);
		expect(models.ghost.countDocuments).toHaveBeenCalledWith(filter);
		expect(query.sort).toHaveBeenCalledWith({ "stats.encounters": -1, _id: 1 });
		expect(query.skip).toHaveBeenCalledWith(5);
		expect(query.limit).toHaveBeenCalledWith(5);
	});

	it.each([
		["updatedAt", "updatedAt"],
		["kills", "stats.kills"],
		["heroLevel", "heroLevel"],
		["name", "name"],
	] as const)("maps ghost sort %s to %s", async (sort, field) => {
		const query = arrangeQuery(models.ghost.find, []);

		await getGhostHistory({
			userId: "user-id",
			query: { page: 1, limit: 20, sort, direction: "asc" },
		});

		expect(query.sort).toHaveBeenCalledWith({ [field]: 1, _id: 1 });
	});

	it("projects ghost entries and their completed-combat win rate", async () => {
		arrangeQuery(models.ghost.find, [
			{
				_id: "ghost-id",
				sourceRunId: "run-id",
				name: "Shade",
				classId: "mage",
				heroLevel: 6,
				encounterLevel: 5,
				stats: { kills: 2, deaths: 3, encounters: 7 },
				createdAt: new Date("2026-07-01T00:00:00.000Z"),
				updatedAt: new Date("2026-07-02T00:00:00.000Z"),
			},
		]);

		const result = await getGhostHistory({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "createdAt", direction: "desc" },
		});

		expect(result.entries[0]).toEqual({
			ghostId: "ghost-id",
			sourceRunId: "run-id",
			name: "Shade",
			classId: "mage",
			heroLevel: 6,
			encounterLevel: 5,
			kills: 2,
			deaths: 3,
			encounters: 7,
			winRate: 0.4,
			createdAt: "2026-07-01T00:00:00.000Z",
			updatedAt: "2026-07-02T00:00:00.000Z",
		});
	});

	it("reports zero ghost win rate without completed combats", async () => {
		arrangeQuery(models.ghost.find, [
			{
				_id: "ghost-id",
				sourceRunId: "run-id",
				name: "Shade",
				classId: "mage",
				heroLevel: 1,
				encounterLevel: 1,
				stats: { kills: 0, deaths: 0, encounters: 1 },
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		const result = await getGhostHistory({
			userId: "user-id",
			query: { page: 1, limit: 20, sort: "createdAt", direction: "desc" },
		});

		expect(result.entries[0].winRate).toBe(0);
	});
});
