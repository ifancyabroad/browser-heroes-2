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
				season: 1,
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
		state.battleNumber = 111;
		state.zoneNumber = 12;
		state.endlessCycle = 1;
		state.hero.level = 7;
		state.hero.currentHp = 1;
		state.hero.pendingLevelUp = { availableAtLevel: 2, selectionRequired: true } as never;
		ghostModel.findOneAndUpdate.mockResolvedValue({ _id: "ghost-id" });

		await createGhostFromRunIfEligible({
			season: 1,
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
					encounterLevel: 12,
					snapshot: {
						hero: {
							...state.hero,
							currentHp: state.hero.maxHp,
							pendingLevelUp: null,
						},
						createdFrom: {
							battleNumber: 111,
							zoneNumber: 12,
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
				season: 1,
				encounterLevel: 4,
				seed: "seed",
				battleNumber: 12,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
				defeatedGhostIds: [],
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
				season: 1,
				encounterLevel: 4,
				seed: "seed-73",
				battleNumber: 12,
				ghostPoolCutoff: cutoff,
				defeatedGhostIds: ["507f1f77bcf86cd799439011", "system-ghost:dawn_keeper"],
			}),
		).resolves.toMatchObject({
			ghostId: "ghost-id",
			ghostUsername: "Owner",
			ghostSource: "player",
		});
		const filter = {
			season: 1,
			encounterLevel: 4,
			createdAt: { $lt: cutoff },
			$or: [{ banishedAt: null }, { banishedAt: { $gte: cutoff } }],
			_id: { $nin: ["507f1f77bcf86cd799439011"] },
		};
		expect(ghostModel.findOne).toHaveBeenCalledWith(filter);
		expect(sort).toHaveBeenCalledWith({ createdAt: -1, _id: 1 });
		expect(skip).toHaveBeenCalledWith(2);
	});

	it("uses the level-matched system ghost when the frozen player pool is empty", async () => {
		ghostModel.countDocuments.mockResolvedValue(0);

		await expect(
			selectGhostEncounter({
				season: 1,
				encounterLevel: 4,
				seed: "seed-73",
				battleNumber: 12,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
				defeatedGhostIds: [],
			}),
		).resolves.toMatchObject({
			ghostId: "system-ghost:dawn_keeper",
			ghostUsername: "The Forgotten",
			ghostSource: "system",
			hero: { level: 5, classId: "priest" },
		});
		expect(ghostModel.findOne).not.toHaveBeenCalled();
		expect(userModel.findById).not.toHaveBeenCalled();
	});

	it("uses the system ghost if the selected player record disappears", async () => {
		ghostModel.countDocuments.mockResolvedValue(1);
		const lean = vi.fn().mockResolvedValue(null);
		const select = vi.fn().mockReturnValue({ lean });
		const skip = vi.fn().mockReturnValue({ select });
		ghostModel.findOne.mockReturnValue({ sort: vi.fn().mockReturnValue({ skip }) });

		await expect(
			selectGhostEncounter({
				season: 1,
				encounterLevel: 10,
				seed: "seed-7",
				battleNumber: 91,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
				defeatedGhostIds: [],
			}),
		).resolves.toMatchObject({
			ghostId: "system-ghost:last_sentinel",
			ghostSource: "system",
		});
		expect(userModel.findById).not.toHaveBeenCalled();
	});

	it.each([
		[91, "seed-7", 10, 10],
		[99, "seed-29", 10, 10],
		[101, "seed-10", 11, { $gt: 10 }],
		[145, "seed-19", 15, { $gt: 10 }],
	] as const)(
		"selects the correct player ghost pool at battle %i",
		async (battleNumber, seed, encounterLevel, encounterLevelFilter) => {
			const cutoff = new Date("2026-08-23T00:00:00.000Z");
			ghostModel.countDocuments.mockResolvedValue(0);

			await selectGhostEncounter({
				season: 1,
				encounterLevel,
				seed,
				battleNumber,
				ghostPoolCutoff: cutoff,
				defeatedGhostIds: [],
			});

			expect(ghostModel.countDocuments).toHaveBeenCalledWith(
				expect.objectContaining({
					season: 1,
					encounterLevel: encounterLevelFilter,
				}),
			);
		},
	);

	it("does not use a system ghost when the endless player pool is empty", async () => {
		ghostModel.countDocuments.mockResolvedValue(0);

		await expect(
			selectGhostEncounter({
				season: 1,
				encounterLevel: 11,
				seed: "seed-10",
				battleNumber: 101,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
				defeatedGhostIds: [],
			}),
		).resolves.toBeNull();
		expect(ghostModel.findOne).not.toHaveBeenCalled();
		expect(userModel.findById).not.toHaveBeenCalled();
	});

	it("preserves an endless ghost's death zone and hero level", async () => {
		const state = createTestRunState();
		state.battleNumber = 111;
		state.zoneNumber = 12;
		state.hero.level = 7;

		await createGhostFromRunIfEligible({
			season: 1,
			userId: "user-id",
			runId: "run-id" as never,
			state,
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				$setOnInsert: expect.objectContaining({
					heroLevel: 7,
					encounterLevel: 12,
					snapshot: expect.objectContaining({
						hero: expect.objectContaining({ level: 7 }),
					}),
				}),
			}),
			expect.anything(),
		);
	});

	it("places the first eligible level-three hero in the zone-two ghost pool", async () => {
		const state = createTestRunState();
		state.battleNumber = 11;
		state.zoneNumber = 2;
		state.hero.level = 3;

		await createGhostFromRunIfEligible({
			season: 1,
			userId: "user-id",
			runId: "run-id" as never,
			state,
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				$setOnInsert: expect.objectContaining({
					heroLevel: 3,
					encounterLevel: 2,
				}),
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
			banishedBy: {
				sourceId: "run-id",
				heroName: "Banisher",
				classId: "mage",
				heroLevel: 7,
			},
			session: session as never,
		});

		expect(ghostModel.findOneAndUpdate).toHaveBeenCalledWith(
			{ _id: "ghost-id" },
			{ $inc: { [field]: 1 } },
			{ returnDocument: "after", session },
		);
		if (outcome === "ghost_lost") {
			expect(ghostModel.updateOne).toHaveBeenCalledWith(
				{ _id: "ghost-id", status: "active" },
				expect.objectContaining({
					$set: expect.objectContaining({
						status: "banished",
						banishedAt: expect.any(Date),
						banishedBy: {
							sourceId: "run-id",
							heroName: "Banisher",
							classId: "mage",
							heroLevel: 7,
						},
					}),
				}),
				{ session },
			);
		}
	});

	it("does not repeat a defeated system ghost in the same run", async () => {
		ghostModel.countDocuments.mockResolvedValue(0);

		await expect(
			selectGhostEncounter({
				season: 1,
				encounterLevel: 4,
				seed: "seed-73",
				battleNumber: 12,
				ghostPoolCutoff: new Date("2026-08-23T00:00:00.000Z"),
				defeatedGhostIds: ["system-ghost:dawn_keeper"],
			}),
		).resolves.toBeNull();
	});
});
