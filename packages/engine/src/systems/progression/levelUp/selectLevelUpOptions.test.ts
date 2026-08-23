import { describe, expect, it } from "vitest";

import { createContextRngState } from "../../../core/rng";
import { createTestRunState, modifyTestRunState } from "../../../test/createTestRunState";
import { selectLevelUpOptions } from "./selectLevelUpOptions";

describe("selectLevelUpOptions", () => {
	it("uses a shared ranking and skips a skill already owned", () => {
		const state = createTestRunState();
		const context = createContextRngState(state.seed, "level-up", 2, "skill", 0);
		const baseline = selectLevelUpOptions(state.hero, "skill", context);
		const firstOption = baseline[0];

		if (!firstOption || firstOption.type !== "skill") {
			throw new Error("Expected a skill option");
		}

		const changedState = modifyTestRunState(state, (draft) => {
			draft.hero.skills.push({ skillId: firstOption.skillId });
		});
		const filtered = selectLevelUpOptions(changedState.hero, "skill", context);

		expect(filtered).not.toContainEqual(firstOption);
		expect(filtered.slice(0, 2)).toEqual(baseline.slice(1));
	});
});
