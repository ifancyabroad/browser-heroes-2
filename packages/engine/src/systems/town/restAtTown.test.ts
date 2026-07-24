import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	createTestRunState,
	createTestTownState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("restAtTown", () => {
	it("restores health and skill charges while advancing the day", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.currentHp = 1;
			draft.hero.skills[0].chargesRemaining = 0;
		});

		const result = applyAction(state, { type: "REST_AT_TOWN" });

		expect(result.ok).toBe(true);
		expect(result.state.day).toBe(state.day + 1);
		expect(result.state.gold).toBeLessThan(state.gold);
		expect(result.state.hero.currentHp).toBeGreaterThan(state.hero.currentHp);
		expect(result.state.hero.skills[0].chargesRemaining).toBeGreaterThan(0);
		expect(result.events).toContainEqual(
			expect.objectContaining({ type: "RESTED_AT_TOWN", hpRestored: expect.any(Number) }),
		);
	});

	it("rejects resting without enough gold", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
		});

		expect(applyAction(state, { type: "REST_AT_TOWN" })).toMatchObject({
			ok: false,
			error: "NOT_ENOUGH_GOLD",
			state,
		});
	});

	it("rejects resting outside town", () => {
		const state = createTestRunState();

		expect(applyAction(state, { type: "REST_AT_TOWN" })).toMatchObject({
			ok: false,
			error: "TOWN_NOT_AVAILABLE",
		});
	});
});
