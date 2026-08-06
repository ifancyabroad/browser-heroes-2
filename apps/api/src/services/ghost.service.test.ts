import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTestRunState } from "../test/createTestRun";

const ghostModel = vi.hoisted(() => ({
	findOneAndUpdate: vi.fn(),
	find: vi.fn(),
	updateOne: vi.fn(),
}));

vi.mock("../models/ghost.model", () => ({ GhostModel: ghostModel }));

import {
	createGhostFromRunIfEligible,
	incrementGhostEncounters,
	recordGhostCombatOutcome,
	selectGhostEncounterForLevel,
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

	it("usually skips ghost selection without querying persistence", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0.5);

		await expect(selectGhostEncounterForLevel({ encounterLevel: 3 })).resolves.toBeNull();
		expect(ghostModel.find).not.toHaveBeenCalled();
	});

	it("returns null when the chance succeeds but no matching ghosts exist", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0.01);
		const lean = vi.fn().mockResolvedValue([]);
		const sort = vi.fn().mockReturnValue({ lean });
		ghostModel.find.mockReturnValue({ sort });

		await expect(selectGhostEncounterForLevel({ encounterLevel: 3 })).resolves.toBeNull();
		expect(ghostModel.find).toHaveBeenCalledWith({ encounterLevel: 3 });
		expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
	});

	it("selects recent ghosts with greater weight", async () => {
		vi.spyOn(Math, "random").mockReturnValueOnce(0.01).mockReturnValueOnce(0);
		const ghosts = [
			{ _id: "recent", snapshot: { hero: { name: "Recent" } } },
			{ _id: "older", snapshot: { hero: { name: "Older" } } },
		];
		ghostModel.find.mockReturnValue({
			sort: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(ghosts) }),
		});

		await expect(selectGhostEncounterForLevel({ encounterLevel: 3 })).resolves.toEqual({
			ghostId: "recent",
			hero: { name: "Recent" },
		});
	});

	it("can select an older ghost from the weighted pool", async () => {
		vi.spyOn(Math, "random").mockReturnValueOnce(0.01).mockReturnValueOnce(0.99);
		const ghosts = [
			{ _id: "recent", snapshot: { hero: { name: "Recent" } } },
			{ _id: "older", snapshot: { hero: { name: "Older" } } },
		];
		ghostModel.find.mockReturnValue({
			sort: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(ghosts) }),
		});

		await expect(selectGhostEncounterForLevel({ encounterLevel: 3 })).resolves.toEqual({
			ghostId: "older",
			hero: { name: "Older" },
		});
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
