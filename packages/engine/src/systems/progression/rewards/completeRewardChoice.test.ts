import { describe, expect, it } from "vitest";
import { applyAction } from "../../../actions";
import { createTestVictoryState, modifyTestRunState } from "../../../test/createTestRunState";

describe("completeRewardChoice", () => {
	it("adds the selected gold and clears the pending choice", () => {
		const state = createGoldRewardState();

		const result = applyAction(state, {
			type: "SELECT_REWARD",
			selection: { optionIndex: 1 },
		});

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(state.gold + 20);
		expect(result.state.pendingRewardChoice).toBeNull();
		expect(result.events).toEqual([
			{ type: "REWARD_SELECTED", rewardType: "gold", amount: 20 },
		]);
	});

	it("rejects selection when no reward is pending", () => {
		const state = createTestVictoryState();

		expect(
			applyAction(state, {
				type: "SELECT_REWARD",
				selection: { optionIndex: 0 },
			}),
		).toMatchObject({ ok: false, error: "REWARD_NOT_AVAILABLE", state });
	});

	it("rejects an equipment slot for a gold reward", () => {
		const state = createGoldRewardState();

		expect(
			applyAction(state, {
				type: "SELECT_REWARD",
				selection: { optionIndex: 0, equipmentSlot: "mainHand" },
			}),
		).toMatchObject({ ok: false, error: "INVALID_REWARD_SELECTION", state });
	});
});

function createGoldRewardState() {
	return modifyTestRunState(createTestVictoryState(), (draft) => {
		draft.pendingRewardChoice = {
			options: [
				{ type: "gold", amount: 10 },
				{ type: "gold", amount: 20 },
				{ type: "gold", amount: 30 },
			],
		};
	});
}
