import { describe, expect, it } from "vitest";
import { applyAction } from "../../../actions";
import { createTestVictoryState, modifyTestRunState } from "../../../test/createTestRunState";

describe("completeLevelUp", () => {
	it("applies a skill choice, HP gain, and refreshes the completed combat player", () => {
		const state = withPendingLevelUp({
			type: "skill",
			skillId: "fireball",
		});

		const result = applyAction(state, {
			type: "COMPLETE_LEVEL_UP",
			selection: { type: "skill", skillId: "fireball" },
		});

		expect(result.ok).toBe(true);
		expect(result.state.hero.level).toBe(2);
		expect(result.state.hero.maxHp).toBe(state.hero.maxHp + 9);
		expect(result.state.hero.currentHp).toBeGreaterThan(state.hero.currentHp);
		expect(result.state.hero.skills).toContainEqual(
			expect.objectContaining({ skillId: "fireball" }),
		);
		expect(result.state.combat?.player.maxHp).toBeGreaterThan(state.combat!.player.maxHp);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "LEVEL_UP_COMPLETED",
				level: 2,
				selection: { type: "skill", skillId: "fireball" },
			}),
		);
	});

	it("applies a feat choice", () => {
		const state = withPendingLevelUp({
			type: "feat",
			featId: "duelist",
		});

		const result = applyAction(state, {
			type: "COMPLETE_LEVEL_UP",
			selection: { type: "feat", featId: "duelist" },
		});

		expect(result.ok).toBe(true);
		expect(result.state.hero.featIds).toContain("duelist");
	});

	it("completes levels with no choice using a null selection", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.hero.pendingLevelUp = { level: 7, hpGain: 9, rerollIndex: 0, options: [] };
		});

		const result = applyAction(state, {
			type: "COMPLETE_LEVEL_UP",
			selection: null,
		});

		expect(result.ok).toBe(true);
		expect(result.state.hero.level).toBe(7);
	});

	it("rejects missing, invalid, and unexpected selections", () => {
		const noPending = createTestVictoryState();
		expect(
			applyAction(noPending, { type: "COMPLETE_LEVEL_UP", selection: null }),
		).toMatchObject({ ok: false, error: "LEVEL_UP_NOT_AVAILABLE" });

		const choicePending = withPendingLevelUp({
			type: "skill",
			skillId: "fireball",
		});
		expect(
			applyAction(choicePending, { type: "COMPLETE_LEVEL_UP", selection: null }),
		).toMatchObject({ ok: false, error: "INVALID_LEVEL_UP_SELECTION" });

		const noChoicePending = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.hero.pendingLevelUp = { level: 7, hpGain: 9, rerollIndex: 0, options: [] };
		});
		expect(
			applyAction(noChoicePending, {
				type: "COMPLETE_LEVEL_UP",
				selection: { type: "skill", skillId: "fireball" },
			}),
		).toMatchObject({ ok: false, error: "INVALID_LEVEL_UP_SELECTION" });
	});
});

function withPendingLevelUp(
	option: { type: "skill"; skillId: "fireball" } | { type: "feat"; featId: "duelist" },
) {
	return modifyTestRunState(createTestVictoryState(), (draft) => {
		draft.hero.pendingLevelUp = {
			level: 2,
			hpGain: 9,
			rerollIndex: 0,
			options: [option],
		};
	});
}
