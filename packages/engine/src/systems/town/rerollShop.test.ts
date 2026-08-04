import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { createTestTownState, modifyTestRunState } from "../../test/createTestRunState";

describe("rerollShop", () => {
	it("charges gold, advances RNG, and replaces the shop deterministically", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
		});

		const first = applyAction(state, { type: "REROLL_SHOP" });
		const second = applyAction(state, { type: "REROLL_SHOP" });

		expect(first).toEqual(second);
		expect(first.ok).toBe(true);
		expect(first.state.gold).toBeLessThan(state.gold);
		expect(first.state.rngState).not.toEqual(state.rngState);
		expect(first.state.town?.rerollCount).toBe(1);
		expect(first.events).toContainEqual(expect.objectContaining({ type: "SHOP_REROLLED" }));
	});

	it("rejects rerolling without enough gold", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
		});

		expect(applyAction(state, { type: "REROLL_SHOP" })).toMatchObject({
			ok: false,
			error: "NOT_ENOUGH_GOLD",
			state,
		});
	});

	it("charges the shop-level-scaled reroll cost", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 1_000;
			if (!draft.town) {
				throw new Error("Expected test run to be in town");
			}
			draft.town.shopLevel = 5;
		});

		const result = applyAction(state, { type: "REROLL_SHOP" });

		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(908);
		expect(result.events).toContainEqual({ type: "SHOP_REROLLED", cost: 92 });
	});
});
