import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTestRunState } from "../test/createTestRun";

const ghostModel = vi.hoisted(() => ({
	countDocuments: vi.fn(),
	findOne: vi.fn(),
	findOneAndUpdate: vi.fn(),
	find: vi.fn(),
	updateOne: vi.fn(),
}));
const userModel = vi.hoisted(() => ({ findById: vi.fn() }));

vi.mock("../models/ghost.model", () => ({ GhostModel: ghostModel }));
vi.mock("../models/user.model", () => ({ UserModel: userModel }));

import {
	createGhostFromRunIfEligible,
	incrementGhostEncounters,
	recordGhostCombatOutcome,
	selectGhostEncounter,
} from "./ghost.service";

describe("ghost.service", () => {
	const session = { id: "session" };

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("does not create a ghost before progressing beyond the first boss", async () => {
		const state = createTestRunState();
		state.battleNumber = 10;

		await expect(
			createGhostFromRunIfEligible({
				userId: "user-id",
				runId: "run-id" as never,
				state,
				session: session as never,
			}),
		).resolves.toBeNull();
		expect(ghostModel.findOneAndUpdate).not.toHaveBeenCalled();
	});

	it("upserts one full-health ghost snapshot per eligible run", async () => {
		const state = createTestRunState();
		state.battleNumber = 11;
		state.zoneNumber = 2;
		state.endlessCycle = 1;
		state.hero.currentHp = 1;
		state.hero.pendingLevelUp = { availableAtLevel: 2, selectionRequired: true } as never;
		ghostModel.findOneAndUpdate.mockResolvedValue({ _id: "ghost-id" });

		await createGhostFromRunIfEligible({
			userId: "user-id",
			runId: "run-id" as never,
			state,
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			{ sourceRunId: "run-id" },
			{
				$setOnInsert: expect.objectContaining({
					userId: "user-id",
					sourceRunId: "run-id",
					name: state.hero.name,
					classId: state.hero.classId,
					heroLevel: state.hero.level,
					encounterLevel: state.hero.level,
					snapshot: {
						hero: {
							...state.hero,
							currentHp: state.hero.maxHp,
							pendingLevelUp: null,
						},
						createdFrom: {
							battleNumber: 11,
							zoneNumber: 2,
							endlessCycle: 1,
							phase: state.phase,
						},
					},
					stats: { kills: 0, deaths: 0, encounters: 0 },
				}),
			},
			{ returnDocument: "after", upsert: true, session },
		);
	});

	it("uses the run seed and battle number for the encounter roll", async () => {
		await expect(
			selectGhostEncounter({
				encounterLevel: 4,
				seed: "seed",
				battleNumber: 12,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
			}),
		).resolves.toBeNull();
		expect(ghostModel.countDocuments).not.toHaveBeenCalled();
	});

	it("selects from the frozen ghost pool in stable order", async () => {
		const cutoff = new Date("2026-08-23T00:00:00.000Z");
		ghostModel.countDocuments.mockResolvedValue(4);
		const selectGhost = vi.fn().mockReturnValue({
			lean: vi.fn().mockResolvedValue({
				_id: "ghost-id",
				userId: "owner-id",
				snapshot: { hero: { name: "Shade" } },
			}),
		});
		const skip = vi.fn().mockReturnValue({ select: selectGhost });
		const sort = vi.fn().mockReturnValue({ skip });
		ghostModel.findOne.mockReturnValue({ sort });
		userModel.findById.mockReturnValue({
			select: vi
				.fn()
				.mockReturnValue({ lean: vi.fn().mockResolvedValue({ displayName: "Owner" }) }),
		});

		await expect(
			selectGhostEncounter({
				encounterLevel: 4,
				seed: "seed-73",
				battleNumber: 12,
				ghostPoolCutoff: cutoff,
			}),
		).resolves.toMatchObject({ ghostId: "ghost-id", ghostUsername: "Owner" });
		const filter = { encounterLevel: 4, createdAt: { $lt: cutoff } };
		expect(ghostModel.findOne).toHaveBeenCalledWith(filter);
		expect(sort).toHaveBeenCalledWith({ createdAt: -1, _id: 1 });
		expect(skip).toHaveBeenCalledWith(2);
	});

	it("caps ghost encounter levels at ten", async () => {
		const state = createTestRunState();
		state.battleNumber = 11;
		state.hero.level = 12;

		await createGhostFromRunIfEligible({
			userId: "user-id",
			runId: "run-id" as never,
			state,
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				$setOnInsert: expect.objectContaining({ encounterLevel: 10 }),
			}),
			expect.anything(),
		);
	});

	it("increments encounter counts in the supplied transaction", async () => {
		await incrementGhostEncounters({
			ghostId: "ghost-id",
			session: session as never,
		});

		expect(ghostModel.updateOne).toHaveBeenCalledWith(
			{ _id: "ghost-id" },
			{ $inc: { "stats.encounters": 1 } },
			{ session },
		);
	});

	it.each([
		["ghost_won", "stats.kills"],
		["ghost_lost", "stats.deaths"],
	] as const)("records %s outcomes against %s", async (outcome, field) => {
		await recordGhostCombatOutcome({
			ghostId: "ghost-id",
			outcome,
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			{ _id: "ghost-id" },
			{ $inc: { [field]: 1 } },
			{ returnDocument: "after", session },
		);
	});
});
