import { describe, expect, it } from "vitest";
import { createTestRunState, modifyTestRunState } from "../test/createTestRunState";
import { selectHeroProgression } from "./selectHeroProgression";

describe("selectHeroProgression", () => {
	it("projects thresholds and a pending level-up result", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			draft.hero.xp = 50;
			draft.hero.pendingLevelUp = { level: 2, hpGain: 9, options: [] };
		});

		expect(selectHeroProgression(state)).toMatchObject({
			level: 1,
			xp: 50,
			currentLevelXp: 0,
			nextLevelXp: 50,
			availableLevel: 2,
			canLevelUp: true,
			levelUpRerolls: 5,
			canRerollLevelUp: false,
			resultingMaxHp: expect.any(Number),
		});
	});
});
