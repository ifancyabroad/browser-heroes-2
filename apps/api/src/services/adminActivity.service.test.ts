import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Types } from "mongoose";
import type { AdminActivityEntry } from "@app/shared";
import { SKILLS_BY_ID } from "@app/content";
import { createTestCombatState } from "../test/createTestRun";

const mocks = vi.hoisted(() => ({
	create: vi.fn(),
	find: vi.fn(),
	findOne: vi.fn(),
	deleteMany: vi.fn(),
	notify: vi.fn(),
	name: vi.fn(),
}));
vi.mock("../models/adminActivity.model", () => ({ AdminActivityModel: mocks }));
vi.mock("../notifications/adminActivity", () => ({ notifyAdminActivity: mocks.notify }));
vi.mock("./publicIdentity.service", () => ({
	getRegisteredDisplayName: mocks.name,
}));

import { toAdminActivityEvent } from "./adminActivity.events";
import {
	getAdminActivity,
	recordAdminActivity,
	publishAdminActivity,
	recordAndPublishAdminActivity,
} from "./adminActivity.service";

describe("admin activity", () => {
	const state = createTestCombatState();
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.name.mockResolvedValue("Player");
	});

	it("projects all battle outcomes once, preserving encounter significance", () => {
		for (const encounterType of ["standard", "boss", "ghost"] as const) {
			expect(
				toAdminActivityEvent(
					{
						type: "COMBAT_ENDED",
						combatId: "combat",
						battleNumber: 100,
						encounterType,
						enemySourceId: "enemy",
						outcome: "victory",
						turnNumber: 2,
						defeatedFinalBoss: true,
						completedEndlessCycle: false,
						finishingPlayerAction: null,
						reward: { gold: 1, xp: 1 },
					},
					state,
				),
			).toEqual({
				type: "battle_result",
				outcome: "victory",
				enemyName: state.combat!.enemy.name,
				battleNumber: 100,
				encounterType,
				finalBoss: true,
			});
		}
		expect(
			toAdminActivityEvent(
				{
					type: "COMBAT_ENDED",
					combatId: "combat",
					battleNumber: 5,
					encounterType: "standard",
					enemySourceId: "enemy",
					outcome: "defeat",
					turnNumber: 2,
				},
				state,
			),
		).toMatchObject({ type: "battle_result", outcome: "defeat", finalBoss: false });
	});

	it("records purchases once, with prices, quantities and legendary rarity", () => {
		const item = {
			itemInstanceId: "instance",
			itemId: "item",
			itemName: "Treasure",
			rarity: "legendary" as const,
		};
		expect(
			toAdminActivityEvent(
				{ type: "ITEM_BOUGHT", item, equipmentSlot: "mainHand", price: 42 },
				state,
			),
		).toEqual({ type: "item_purchased", itemName: "Treasure", rarity: "legendary", price: 42 });
		expect(
			toAdminActivityEvent(
				{
					type: "CONSUMABLE_BOUGHT",
					consumableType: "healingPotion",
					quantity: 3,
					cost: 15,
					remainingQuantity: 4,
				},
				state,
			),
		).toEqual({
			type: "consumables_purchased",
			consumableName: "Healing Potion",
			quantity: 3,
			cost: 15,
		});
		expect(
			toAdminActivityEvent(
				{ type: "REWARD_SELECTED", rewardType: "item", item, equipmentSlot: "mainHand" },
				state,
			),
		).toEqual({ type: "legendary_reward", itemName: "Treasure" });
		expect(
			toAdminActivityEvent(
				{ type: "REWARD_SELECTED", rewardType: "gold", amount: 10 },
				state,
			),
		).toBeNull();
	});

	it("supports level-ups with and without a selection and ignores routine turns", () => {
		const base = { type: "LEVEL_UP_COMPLETED" as const, level: 2, hpGain: 3, newMaxHp: 20 };
		expect(toAdminActivityEvent({ ...base, selection: null }, state)).toEqual({
			type: "level_up",
			level: 2,
			selection: null,
		});
		const skillId = Object.keys(SKILLS_BY_ID)[0] as keyof typeof SKILLS_BY_ID;
		expect(
			toAdminActivityEvent({ ...base, selection: { type: "skill", skillId } }, state),
		).toMatchObject({ selection: { type: "skill", name: SKILLS_BY_ID[skillId].name } });
		expect(toAdminActivityEvent({ type: "COMBAT_TURN_RESOLVED" }, state)).toBeNull();
	});

	it("records source keys by original event index without a gameplay session", async () => {
		mocks.create.mockImplementation(async (records) =>
			records.map((record: object) => ({
				...record,
				_id: "id" as unknown as Types.ObjectId,
			})),
		);
		await recordAdminActivity({
			runId: "run",
			userId: "user",
			mode: "normal",
			state,
			sequence: 4,
			events: [{ type: "COMBAT_TURN_RESOLVED" }, { type: "RUN_STARTED" }],
		});
		expect(mocks.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					sourceKey: "run:4:1",
					runId: "run",
					displayName: "Player",
				}),
			],
			{ ordered: true },
		);
		expect(mocks.notify).not.toHaveBeenCalled();
	});

	it("records, publishes and prunes committed activity in the background task", async () => {
		mocks.create.mockImplementation(async (records) =>
			records.map((record: object) => ({ ...record, _id: "id" })),
		);
		mocks.findOne.mockReturnValue({
			sort: vi.fn().mockReturnThis(),
			skip: vi.fn().mockReturnThis(),
			lean: vi.fn().mockResolvedValue(null),
		});
		await recordAndPublishAdminActivity({
			runId: "run",
			userId: "user",
			mode: "normal",
			state,
			sequence: 1,
			events: [{ type: "RUN_STARTED" }],
		});
		expect(mocks.notify).toHaveBeenCalledExactlyOnceWith([
			expect.objectContaining({ id: "id", runId: "run", event: { type: "hero_created" } }),
		]);
		expect(mocks.findOne).toHaveBeenCalledOnce();
	});

	it.each(["identity", "storage"])(
		"catches background %s failures without publishing unsaved events",
		async (failure) => {
			const log = vi.spyOn(console, "error").mockImplementation(() => {});
			const error = new Error(`${failure} failed`);
			if (failure === "identity") {
				mocks.name.mockRejectedValueOnce(error);
			} else {
				mocks.create.mockRejectedValueOnce(error);
			}
			await expect(
				recordAndPublishAdminActivity({
					runId: "run",
					userId: "user",
					mode: "normal",
					state,
					sequence: 1,
					events: [{ type: "RUN_STARTED" }],
				}),
			).resolves.toBeUndefined();
			expect(mocks.notify).not.toHaveBeenCalled();
			expect(mocks.findOne).not.toHaveBeenCalled();
			expect(log).toHaveBeenCalledExactlyOnceWith("Admin activity recording failed", error);
			log.mockRestore();
		},
	);

	it("fetches bounded chronological history and prunes timestamp ties by ID", async () => {
		const createdAt = new Date("2026-11-16T12:00:00Z");
		const query = {
			sort: vi.fn().mockReturnThis(),
			limit: vi.fn().mockReturnThis(),
			lean: vi.fn().mockResolvedValue([
				{ _id: "b", createdAt },
				{ _id: "a", createdAt },
			]),
		};
		mocks.find.mockReturnValue(query);
		expect((await getAdminActivity()).map((entry) => entry.id)).toEqual(["a", "b"]);
		expect(query.limit).toHaveBeenCalledWith(500);
		expect(query.sort).toHaveBeenCalledWith({ createdAt: -1, _id: -1 });
		const cutoff = {
			sort: vi.fn().mockReturnThis(),
			skip: vi.fn().mockReturnThis(),
			lean: vi.fn().mockResolvedValue({ _id: "cutoff", createdAt }),
		};
		mocks.findOne.mockReturnValue(cutoff);
		await publishAdminActivity([{} as AdminActivityEntry]);
		expect(cutoff.skip).toHaveBeenCalledWith(499);
		expect(mocks.deleteMany).toHaveBeenCalledWith({
			$or: [{ createdAt: { $lt: createdAt } }, { createdAt, _id: { $lt: "cutoff" } }],
		});
	});

	it("isolates delivery and cleanup failures from committed gameplay", async () => {
		const log = vi.spyOn(console, "error").mockImplementation(() => {});
		mocks.notify.mockRejectedValueOnce(new Error("delivery"));
		mocks.findOne.mockImplementationOnce(() => {
			throw new Error("cleanup");
		});
		await expect(publishAdminActivity([{} as AdminActivityEntry])).resolves.toBeUndefined();
		expect(log).toHaveBeenCalledTimes(2);
		log.mockRestore();
	});
});
