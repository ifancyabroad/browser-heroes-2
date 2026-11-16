import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ aggregate: vi.fn(), names: vi.fn() }));
vi.mock("../models/run.model", () => ({ RunModel: { collection: { name: "runs" } } }));
vi.mock("../models/runAction.model", () => ({ RunActionModel: { aggregate: mocks.aggregate } }));
vi.mock("./publicIdentity.service", () => ({ getRegisteredDisplayNames: mocks.names }));

import { getAdminActiveHeroes } from "./adminRealtime.service";

describe("recently active heroes", () => {
	const now = new Date("2026-11-16T12:00:00Z");
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
		vi.setSystemTime(now);
		mocks.aggregate.mockResolvedValue([]);
		mocks.names.mockResolvedValue(new Map());
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	// Unit checks guard query policy at the model boundary; they do not execute MongoDB.
	it.each([undefined, "normal", "dailyChallenge"] as const)(
		"requests only recent successful activity and unfinished runs for mode %s",
		async (mode) => {
			await getAdminActiveHeroes(mode);
			const createdAt = { $gte: new Date("2026-11-16T11:55:00Z"), $lte: now };
			const runFilter = { status: "active", ...(mode ? { mode } : {}) };
			expect(mocks.aggregate).toHaveBeenCalledWith(
				expect.arrayContaining([
					{ $match: { createdAt, success: true } },
					expect.objectContaining({
						$unionWith: expect.objectContaining({
							coll: "runs",
							pipeline: expect.arrayContaining([
								{ $match: { createdAt, ...runFilter } },
							]),
						}),
					}),
					expect.objectContaining({
						$lookup: expect.objectContaining({
							from: "runs",
							pipeline: expect.arrayContaining([
								{ $match: runFilter },
								{ $project: { summary: 1, userId: 1, mode: 1 } },
							]),
						}),
					}),
					{ $sort: { lastActivityAt: -1, _id: -1 } },
					{ $limit: 50 },
				]),
			);
		},
	);

	it("returns an empty list when no recent heroes are found", async () => {
		expect(await getAdminActiveHeroes()).toEqual([]);
		expect(mocks.names).toHaveBeenCalledWith([]);
	});

	it("returns public summaries and nullable names, without state or account fields", async () => {
		const summary = {
			heroName: "Mira",
			classId: "mage",
			level: 2,
			battleNumber: 4,
			zone: "forest",
		};
		mocks.aggregate.mockResolvedValue([
			{
				_id: "run1",
				lastActivityAt: now,
				run: {
					userId: "user1",
					mode: "normal",
					summary,
					state: { secret: true },
					email: "private@example.com",
				},
			},
			{
				_id: "run2",
				lastActivityAt: now,
				run: {
					userId: "user2",
					mode: "dailyChallenge",
					summary: { ...summary, heroName: "Thorn" },
				},
			},
		]);
		mocks.names.mockResolvedValue(new Map([["user1", "Player"]]));
		expect(await getAdminActiveHeroes()).toEqual([
			{
				runId: "run1",
				lastActivityAt: now.toISOString(),
				mode: "normal",
				...summary,
				displayName: "Player",
			},
			{
				runId: "run2",
				lastActivityAt: now.toISOString(),
				mode: "dailyChallenge",
				...summary,
				heroName: "Thorn",
				displayName: null,
			},
		]);
		expect(mocks.names).toHaveBeenCalledWith(["user1", "user2"]);
	});
});
