import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ClientSession } from "mongoose";
import type { EngineEvent } from "@app/engine";
import { toWorldLogEvent } from "./worldLog.events";
import { subscribeToWorldLog } from "../notifications/worldLog";
import { createTestRunState } from "../test/createTestRun";

const model = vi.hoisted(() => ({
	create: vi.fn(),
	find: vi.fn(),
	findOne: vi.fn(),
	deleteMany: vi.fn(),
}));
vi.mock("../models/worldLog.model", () => ({ WorldLogModel: model }));
vi.mock("./publicIdentity.service", () => ({
	getRegisteredDisplayName: vi.fn().mockResolvedValue("Edgar"),
}));

import { getWorldLog, pruneWorldLog, publishWorldLog, recordWorldLog } from "./worldLog.service";

const state = createTestRunState();
const victory: EngineEvent = {
	type: "COMBAT_ENDED",
	combatId: "combat",
	battleNumber: 10,
	encounterType: "boss",
	enemySourceId: "boss",
	outcome: "victory",
	turnNumber: 1,
	defeatedFinalBoss: false,
	completedEndlessCycle: false,
	finishingPlayerAction: null,
	reward: { gold: 1, xp: 1 },
};
const session = {} as ClientSession;
const input = {
	runId: "run",
	userId: "owner",
	mode: "dailyChallenge" as const,
	state,
	session,
	sequence: 0,
	events: [{ type: "RUN_STARTED" }] as EngineEvent[],
};

describe("world log", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		model.create.mockImplementation(async (records) =>
			records.map((record: object, index: number) => ({ ...record, _id: String(index) })),
		);
		model.findOne.mockReturnValue({
			sort: () => ({ skip: () => ({ lean: async () => null }) }),
		});
	});

	it("maps boss victories once and distinguishes final victory from endless bosses", () => {
		expect(toWorldLogEvent(victory, state)).toMatchObject({
			type: "boss_defeated",
			finalBoss: false,
		});
		expect(
			toWorldLogEvent({ ...victory, battleNumber: 100, defeatedFinalBoss: true }, state),
		).toMatchObject({ finalBoss: true });
		expect(
			toWorldLogEvent({ ...victory, battleNumber: 200, completedEndlessCycle: true }, state),
		).toMatchObject({ finalBoss: false });
		expect(toWorldLogEvent({ ...victory, encounterType: "standard" }, state)).toBeNull();
	});

	it("records deaths, rest and retirement, but not ordinary activity", () => {
		expect(
			toWorldLogEvent(
				{
					type: "COMBAT_ENDED",
					combatId: "c",
					battleNumber: 7,
					encounterType: "ghost",
					enemySourceId: "g",
					outcome: "defeat",
					turnNumber: 3,
				},
				state,
			),
		).toEqual({ type: "hero_died", battleNumber: 7, enemyName: state.combat!.enemy.name });
		expect(
			toWorldLogEvent(
				{ type: "RESTED_AT_TOWN", cost: 2, hpRestored: 5 },
				{ ...state, day: 3 },
			),
		).toEqual({
			type: "hero_rested",
			day: 3,
		});
		expect(toWorldLogEvent({ type: "RUN_RETIRED" }, state)).toEqual({ type: "hero_retired" });
		expect(toWorldLogEvent({ type: "RETURNED_TO_TOWN" }, state)).toBeNull();
	});

	it("announces only acquired legendary equipment from either source", () => {
		const item = {
			itemInstanceId: "i",
			itemId: "legendary",
			itemName: "Legend",
			rarity: "legendary" as const,
		};
		for (const event of [
			{ type: "ITEM_BOUGHT", item, equipmentSlot: "mainHand", price: 1 },
			{ type: "REWARD_SELECTED", rewardType: "item", item, equipmentSlot: "mainHand" },
		] as EngineEvent[]) {
			expect(toWorldLogEvent(event, state)).toEqual({
				type: "legendary_acquired",
				itemName: "Legend",
			});
		}
		expect(
			toWorldLogEvent({ type: "REWARD_SELECTED", rewardType: "gold", amount: 5 }, state),
		).toBeNull();
	});

	it("persists public identity snapshots in the supplied transaction with stable source keys", async () => {
		const entries = await recordWorldLog({
			...input,
			sequence: 4,
			events: [{ type: "COMBAT_TURN_RESOLVED" }, { type: "RUN_RETIRED" }],
		});
		expect(model.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					sourceKey: "run:4:1",
					displayName: "Edgar",
					mode: "dailyChallenge",
				}),
			],
			{ session, ordered: true },
		);
		expect(entries[0]).toMatchObject({ id: "0", displayName: "Edgar" });
		expect(entries[0]).not.toHaveProperty("sourceKey");
		expect(entries[0]).not.toHaveProperty("userId");
	});

	it("records creation and skips empty/failed action event lists", async () => {
		await recordWorldLog(input);
		expect(model.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					sourceKey: "run:0:0",
					event: { type: "hero_created" },
				}),
			],
			expect.anything(),
		);
		model.create.mockClear();
		expect(await recordWorldLog({ ...input, sequence: 1, events: [] })).toEqual([]);
		expect(model.create).not.toHaveBeenCalled();
	});

	it("bounds reads and returns chronological public entries", async () => {
		const records = await recordWorldLog(input);
		const limit = vi.fn().mockReturnValue({
			lean: async () => [{ ...records[0], _id: "one", createdAt: new Date() }],
		});
		model.find.mockReturnValue({ sort: () => ({ limit }) });
		const entries = await getWorldLog();
		expect(limit).toHaveBeenCalledWith(50);
		expect(entries[0].id).toBe("one");
	});

	it("prunes only records older than the fiftieth entry, including timestamp ties", async () => {
		const cutoff = { _id: "fiftieth", createdAt: new Date("2020-01-01") };
		const skip = vi.fn().mockReturnValue({ lean: async () => cutoff });
		model.findOne.mockReturnValue({ sort: () => ({ skip }) });
		await pruneWorldLog();
		expect(skip).toHaveBeenCalledWith(49);
		expect(model.deleteMany).toHaveBeenCalledWith({
			$or: [
				{ createdAt: { $lt: cutoff.createdAt } },
				{ createdAt: cutoff.createdAt, _id: { $lt: cutoff._id } },
			],
		});
	});

	it("does not fail committed play when broadcasting fails", async () => {
		const error = vi.spyOn(console, "error").mockImplementation(() => {});
		const entries = await recordWorldLog(input);
		const unsubscribe = subscribeToWorldLog(() => {
			throw Error("offline");
		});
		try {
			await expect(publishWorldLog(entries)).resolves.toBeUndefined();
			expect(model.findOne).toHaveBeenCalledTimes(1);
		} finally {
			unsubscribe();
		}
		expect(error).toHaveBeenCalled();
		error.mockRestore();
	});
});
