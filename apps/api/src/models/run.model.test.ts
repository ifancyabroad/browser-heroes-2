import { Types } from "mongoose";
import { describe, expect, it } from "vitest";
import { RunModel } from "./run.model";

describe("RunModel daily challenge date", () => {
	it("accepts normal runs without challenge metadata", async () => {
		await expect(createRun({ mode: "normal" }).validate()).resolves.toBeUndefined();
	});

	it("requires a challenge date for daily runs", async () => {
		await expect(createRun({ mode: "dailyChallenge" }).validate()).rejects.toMatchObject({
			errors: { dailyChallengeDate: expect.anything() },
		});
	});

	it("keeps challenge dates off normal runs", async () => {
		await expect(
			createRun({
				mode: "normal",
				dailyChallengeDate: "2026-08-23",
			}).validate(),
		).rejects.toMatchObject({ errors: { dailyChallengeDate: expect.anything() } });
	});
});

function createRun(overrides: Record<string, unknown>) {
	return new RunModel({
		season: 1,
		userId: new Types.ObjectId(),
		state: {},
		summary: {
			heroName: "Hero",
			classId: "warrior",
			level: 1,
			battleNumber: 1,
			zoneNumber: 1,
			endlessCycle: 0,
			day: 1,
			kills: 0,
			hasDefeatedFinalBoss: false,
		},
		...overrides,
	});
}
