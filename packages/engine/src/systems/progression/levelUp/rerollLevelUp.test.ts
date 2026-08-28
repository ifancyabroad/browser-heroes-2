import { describe, expect, it } from "vitest";

import { applyAction } from "../../../actions";
import { selectAvailableActions } from "../../../selectors";
import { createTestVictoryState, modifyTestRunState } from "../../../test/createTestRunState";
import { getEligibleSkillOptions } from "./getEligibleSkillOptions";
import { getEligibleFeatOptions } from "./getEligibleFeatOptions";

describe("rerollLevelUp", () => {
	it("replaces a full offer with new deterministic options", () => {
		const state = withSkillOffer();
		const repeatedState = structuredClone(state);
		const currentKeys = state.hero.pendingLevelUp!.options.map(getOptionKey);

		const result = applyAction(state, { type: "REROLL_LEVEL_UP" });
		const repeated = applyAction(repeatedState, { type: "REROLL_LEVEL_UP" });

		expect(result.ok).toBe(true);
		expect(repeated).toEqual(result);
		expect(result.state.hero.pendingLevelUp?.options).toHaveLength(3);
		expect(result.state.hero.pendingLevelUp?.options.map(getOptionKey)).not.toEqual(
			expect.arrayContaining(currentKeys),
		);
		expect(result.state.levelUpRerolls).toBe(4);
		expect(result.state.rngState).toEqual(state.rngState);
		expect(result.state.hero.pendingLevelUp?.rerollIndex).toBe(1);
		expect(result.events).toEqual([{ type: "LEVEL_UP_REROLLED", remainingRerolls: 4 }]);
	});

	it("guarantees the only new option and fills the offer from previous choices", () => {
		const baseState = createTestVictoryState();
		const eligible = getEligibleSkillOptions(baseState.hero);
		const current = eligible.slice(0, 3);
		const alternative = eligible[3];
		const owned = eligible.slice(4);
		const state = modifyTestRunState(baseState, (draft) => {
			draft.hero.skills.push(...owned.map(({ skillId }) => ({ skillId })));
			draft.hero.pendingLevelUp = { level: 2, hpGain: 9, rerollIndex: 0, options: current };
		});

		const result = applyAction(state, { type: "REROLL_LEVEL_UP" });

		expect(result.ok).toBe(true);
		expect(result.state.hero.pendingLevelUp?.options).toHaveLength(3);
		expect(result.state.hero.pendingLevelUp?.options).toContainEqual(alternative);
		expect(
			result.state.hero.pendingLevelUp?.options.filter((option) =>
				current.some((previous) => getOptionKey(previous) === getOptionKey(option)),
			),
		).toHaveLength(2);
	});

	it("rerolls feat offers using only eligible feat choices", () => {
		const baseState = createTestVictoryState();
		const eligible = getEligibleFeatOptions(baseState.hero);
		const current = eligible.slice(0, 3);
		const state = modifyTestRunState(baseState, (draft) => {
			draft.hero.pendingLevelUp = { level: 3, hpGain: 9, rerollIndex: 0, options: current };
		});

		const result = applyAction(state, { type: "REROLL_LEVEL_UP" });

		expect(result.ok).toBe(true);
		expect(result.state.hero.pendingLevelUp?.options).toHaveLength(3);
		expect(
			result.state.hero.pendingLevelUp?.options.every((option) => option.type === "feat"),
		).toBe(true);
		for (const option of result.state.hero.pendingLevelUp?.options ?? []) {
			expect(current.map(getOptionKey)).not.toContain(getOptionKey(option));
		}
	});

	it("rejects unavailable rerolls without changing state or RNG", () => {
		const noPending = createTestVictoryState();
		expect(applyAction(noPending, { type: "REROLL_LEVEL_UP" })).toMatchObject({
			ok: false,
			error: "LEVEL_UP_NOT_AVAILABLE",
			state: noPending,
		});

		const exhausted = modifyTestRunState(withSkillOffer(), (draft) => {
			draft.levelUpRerolls = 0;
		});
		expect(applyAction(exhausted, { type: "REROLL_LEVEL_UP" })).toMatchObject({
			ok: false,
			error: "NO_LEVEL_UP_REROLLS_REMAINING",
			state: exhausted,
		});

		const baseState = createTestVictoryState();
		const eligible = getEligibleSkillOptions(baseState.hero);
		const noAlternatives = modifyTestRunState(baseState, (draft) => {
			draft.hero.skills.push(...eligible.slice(3).map(({ skillId }) => ({ skillId })));
			draft.hero.pendingLevelUp = {
				level: 2,
				hpGain: 9,
				rerollIndex: 0,
				options: eligible.slice(0, 3),
			};
		});
		expect(applyAction(noAlternatives, { type: "REROLL_LEVEL_UP" })).toMatchObject({
			ok: false,
			error: "NO_ALTERNATIVE_LEVEL_UP_OPTIONS",
			state: noAlternatives,
		});
	});

	it("advertises reroll only when the action can succeed", () => {
		const available = withSkillOffer();
		expect(selectAvailableActions(available)).toContainEqual({ type: "REROLL_LEVEL_UP" });

		const exhausted = modifyTestRunState(available, (draft) => {
			draft.levelUpRerolls = 0;
		});
		expect(selectAvailableActions(exhausted)).not.toContainEqual({
			type: "REROLL_LEVEL_UP",
		});
	});
});

function withSkillOffer() {
	const state = createTestVictoryState();
	const options = getEligibleSkillOptions(state.hero).slice(0, 3);

	return modifyTestRunState(state, (draft) => {
		draft.hero.pendingLevelUp = { level: 2, hpGain: 9, rerollIndex: 0, options };
	});
}

function getOptionKey(
	option: { type: "skill"; skillId: string } | { type: "feat"; featId: string },
) {
	return option.type === "skill" ? `skill:${option.skillId}` : `feat:${option.featId}`;
}
