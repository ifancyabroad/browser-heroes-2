import { enemyIds } from "@app/content";
import type { EngineEvent } from "@app/engine";
import type { ClientSession } from "mongoose";
import { beforeEach, describe, expect, it, vi } from "vitest";

const model = vi.hoisted(() => ({ updateOne: vi.fn(), find: vi.fn() }));
vi.mock("../models/bestiary.model", () => ({ BestiaryModel: model }));

import { getBestiary, recordBestiaryEncounter, recordBestiaryProgress } from "./bestiary.service";

const session = {} as ClientSession;
const enemyId = enemyIds[0];
const combatContext = {
	combatId: "combat-id",
	battleNumber: 10,
	encounterType: "boss" as const,
	enemySourceId: enemyId,
};
const victory: EngineEvent = {
	...combatContext,
	type: "COMBAT_ENDED",
	outcome: "victory",
	turnNumber: 3,
	defeatedFinalBoss: false,
	completedEndlessCycle: false,
	finishingPlayerAction: null,
	reward: { gold: 1, xp: 1 },
};

describe("bestiary progress", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		model.updateOne.mockResolvedValue({});
	});

	it("records the first encounter in the run creation transaction", async () => {
		await recordBestiaryEncounter({ userId: "owner", enemyId, session });

		expect(model.updateOne).toHaveBeenCalledWith(
			{ userId: "owner", enemyId },
			{ $inc: { encounters: 1 } },
			{ upsert: true, session },
		);
	});

	it("counts repeated encounters and their outcomes from combat events", async () => {
		await recordBestiaryProgress({
			userId: "owner",
			events: [
				{ ...combatContext, type: "COMBAT_STARTED" },
				victory,
				{
					...combatContext,
					type: "COMBAT_STARTED",
					combatId: "endless-combat",
					battleNumber: 110,
				},
				{
					...combatContext,
					type: "COMBAT_ENDED",
					outcome: "defeat",
					turnNumber: 2,
					combatId: "endless-combat",
					battleNumber: 110,
				},
			],
			session,
		});

		expect(model.updateOne.mock.calls.map((call) => call[1])).toEqual([
			{ $inc: { encounters: 1 } },
			{ $inc: { victories: 1 } },
			{ $inc: { encounters: 1 } },
			{ $inc: { deaths: 1 } },
		]);
		for (const [filter, , options] of model.updateOne.mock.calls) {
			expect(filter).toEqual({ userId: "owner", enemyId });
			expect(options.session).toBe(session);
		}
	});

	it("ignores ghost starts and outcomes as well as ordinary turns", async () => {
		await recordBestiaryProgress({
			userId: "owner",
			events: [
				{ ...combatContext, type: "COMBAT_STARTED", encounterType: "ghost" },
				{ ...victory, encounterType: "ghost" },
				{ type: "COMBAT_TURN_RESOLVED" },
			],
			session,
		});

		expect(model.updateOne).not.toHaveBeenCalled();
	});

	it("propagates write errors to the run transaction", async () => {
		model.updateOne.mockRejectedValueOnce(new Error("write failed"));

		await expect(
			recordBestiaryProgress({ userId: "owner", events: [victory], session }),
		).rejects.toThrow("write failed");
	});

	it("reads only the owner's records without writes or persistence metadata", async () => {
		model.find.mockReturnValue({
			lean: vi
				.fn()
				.mockResolvedValue([
					{ enemyId, encounters: 3, victories: 2, deaths: 1, userId: "owner" },
				]),
		});

		expect(await getBestiary("owner")).toEqual({
			entries: [{ enemyId, encounters: 3, victories: 2, deaths: 1 }],
		});
		expect(model.find).toHaveBeenCalledWith({ userId: "owner" });
		expect(model.updateOne).not.toHaveBeenCalled();
	});
});
