import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	runAggregate: vi.fn(),
	runActionAggregate: vi.fn(),
	userAggregate: vi.fn(),
}));

vi.mock("../models/run.model", () => ({
	RunModel: { aggregate: mocks.runAggregate, collection: { name: "runs" } },
}));
vi.mock("../models/runAction.model", () => ({
	RunActionModel: {
		aggregate: mocks.runActionAggregate,
		collection: { name: "runactions" },
	},
}));
vi.mock("../models/user.model", () => ({
	UserModel: { aggregate: mocks.userAggregate, collection: { name: "users" } },
}));

import {
	getAdminClassMetrics,
	getAdminEnemyMetrics,
	getAdminMetricsOverview,
} from "./adminMetrics.service";

const query = {
	from: "2026-08-01",
	to: "2026-08-03",
	mode: undefined,
};

describe("admin metrics", () => {
	beforeEach(() => {
		mocks.runAggregate.mockReset();
		mocks.runActionAggregate.mockReset();
		mocks.userAggregate.mockReset();
	});

	it("returns zero-filled days and milestones for an empty overview", async () => {
		mocks.runAggregate.mockResolvedValue([]);
		mocks.userAggregate.mockResolvedValue([]);

		const result = await getAdminMetricsOverview(query);

		expect(result.players.active).toEqual({ total: 0, guests: 0, registered: 0 });
		expect(result.daily).toEqual([
			{ date: "2026-08-01", activePlayers: 0, newPlayers: 0, runsStarted: 0 },
			{ date: "2026-08-02", activePlayers: 0, newPlayers: 0, runsStarted: 0 },
			{ date: "2026-08-03", activePlayers: 0, newPlayers: 0, runsStarted: 0 },
		]);
		expect(result.progression[0]).toEqual({ battle: 1, runs: 0, percentage: 0 });
	});

	it("combines identity splits, deduplicated activity, outcomes, and progression", async () => {
		mocks.runAggregate
			.mockResolvedValueOnce([
				{
					classId: "warrior",
					status: "dead",
					battleNumber: 12,
					kills: 11,
					hasDefeatedFinalBoss: false,
				},
				{
					classId: "mage",
					status: "retired",
					battleNumber: 100,
					kills: 99,
					hasDefeatedFinalBoss: true,
				},
				{
					classId: "rogue",
					status: "abandoned",
					battleNumber: 1,
					kills: 0,
					hasDefeatedFinalBoss: false,
				},
			])
			.mockResolvedValueOnce([
				{ _id: "guest", count: 1 },
				{ _id: "registered", count: 1 },
			])
			.mockResolvedValueOnce([{ _id: "2026-08-02", userIds: ["one", "two"] }])
			.mockResolvedValueOnce([{ _id: "2026-08-01", count: 2 }]);
		mocks.userAggregate
			.mockResolvedValueOnce([{ _id: "guest", count: 2 }])
			.mockResolvedValueOnce([{ _id: "2026-08-01", count: 2 }]);

		const result = await getAdminMetricsOverview(query);

		expect(result.players.active).toEqual({ total: 2, guests: 1, registered: 1 });
		expect(result.runs.outcomes).toEqual({ active: 0, dead: 1, retired: 1, abandoned: 1 });
		expect(result.runs.finalBossCompletionRate).toBe(1 / 3);
		expect(result.daily[1].activePlayers).toBe(2);
		expect(result.progression.find((row) => row.battle === 10)).toEqual({
			battle: 10,
			runs: 2,
			percentage: 2 / 3,
		});
		expect(result.progression.find((row) => row.battle === 20)?.runs).toBe(1);
	});

	it("uses terminal runs as the class death-rate denominator", async () => {
		mocks.runAggregate.mockResolvedValue([
			{
				classId: "warrior",
				status: "dead",
				battleNumber: 8,
				kills: 7,
				hasDefeatedFinalBoss: false,
			},
			{
				classId: "warrior",
				status: "retired",
				battleNumber: 100,
				kills: 99,
				hasDefeatedFinalBoss: true,
			},
			{
				classId: "warrior",
				status: "active",
				battleNumber: 3,
				kills: 2,
				hasDefeatedFinalBoss: false,
			},
		]);

		const result = await getAdminClassMetrics(query);
		const warrior = result.classes.find((row) => row.classId === "warrior")!;

		expect(warrior).toMatchObject({
			runsStarted: 3,
			terminalRuns: 2,
			deathRate: 0.5,
			finalBossCompletions: 1,
		});
		expect(warrior.averageBattleReached).toBe(37);
	});

	it("adds run lookups to action activity when filtering by mode", async () => {
		mocks.runAggregate.mockResolvedValue([]);
		mocks.userAggregate.mockResolvedValue([]);
		await getAdminMetricsOverview({ ...query, mode: "dailyChallenge" });

		const activePipeline = mocks.runAggregate.mock.calls[1][0];
		const union = activePipeline.find(
			(stage: Record<string, unknown>) => "$unionWith" in stage,
		) as { $unionWith: { pipeline: Array<Record<string, unknown>> } };
		expect(union.$unionWith.pipeline).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ $match: { "run.mode": "dailyChallenge" } }),
			]),
		);
	});

	it("aggregates resolved combats without exposing individual ghost ids", async () => {
		mocks.runActionAggregate.mockResolvedValue([
			{
				_id: { enemyId: "fire_beetle", encounterType: "standard" },
				combats: 4,
				victories: 3,
				defeats: 1,
				averageTurns: 2.5,
			},
			{
				_id: { enemyId: "ghost", encounterType: "ghost" },
				combats: 2,
				victories: 1,
				defeats: 1,
				averageTurns: 4,
			},
		]);

		const result = await getAdminEnemyMetrics({ ...query, mode: "normal" });

		expect(result.enemies).toEqual([
			expect.objectContaining({
				enemyId: "fire_beetle",
				combats: 4,
				winRate: 0.75,
			}),
			expect.objectContaining({
				enemyId: "ghost",
				winRate: 0.5,
			}),
		]);

		const pipeline = mocks.runActionAggregate.mock.calls[0][0];
		expect(pipeline).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ $match: { "run.mode": "normal" } }),
				expect.objectContaining({ $unwind: "$events" }),
			]),
		);
	});
});
