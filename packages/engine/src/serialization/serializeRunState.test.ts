import { describe, expect, it } from "vitest";

import { applyAction } from "../actions";
import {
	createTestRunState,
	createTestVictoryState,
	modifyTestRunState,
} from "../test/createTestRunState";
import { getLevelUpOptionCandidates } from "../systems/progression/levelUp/getLevelUpOptionCandidates";
import { deserializeRunStateJson } from "./deserializeRunState";
import { serializeRunState } from "./serializeRunState";

describe("serializeRunState", () => {
	it.each(["aggressive", "defensive"] as const)("round trips legacy %s tactics", (tactic) => {
		const state = createTestRunState();
		if (!state.combat) {
			throw new Error("Expected test combat");
		}
		state.combat.enemy.tactic = tactic;
		expect(deserializeRunStateJson(serializeRunState(state))).toEqual({ ok: true, state });
	});

	it("round trips a valid initial state", () => {
		const state = createTestRunState();

		expect(deserializeRunStateJson(serializeRunState(state))).toEqual({
			ok: true,
			state,
		});
	});

	it("round trips a state after an action", () => {
		const state = createTestRunState();
		state.combat!.player.combatStats.initiative = 13;
		state.combat!.enemy.combatStats.initiative = 15;

		const result = applyAction(state, { type: "PLAYER_SKIP_TURN" });

		expect(result.ok).toBe(true);
		expect(deserializeRunStateJson(serializeRunState(result.state))).toEqual({
			ok: true,
			state: result.state,
		});
	});

	it("preserves level-up reroll context and its next offer", () => {
		const baseState = createTestVictoryState();
		const state = modifyTestRunState(baseState, (draft) => {
			draft.hero.pendingLevelUp = {
				level: 3,
				hpGain: 9,
				rerollIndex: 2,
				options: getLevelUpOptionCandidates(draft.hero.classId, 3)
					.map(({ option }) => option)
					.slice(0, 3),
			};
		});
		const restored = deserializeRunStateJson(serializeRunState(state));

		expect(restored.ok).toBe(true);
		if (!restored.ok) {
			throw new Error(restored.error);
		}
		expect(restored.state.hero.pendingLevelUp?.rerollIndex).toBe(2);
		expect(applyAction(restored.state, { type: "REROLL_LEVEL_UP" })).toEqual(
			applyAction(state, { type: "REROLL_LEVEL_UP" }),
		);
	});
});
