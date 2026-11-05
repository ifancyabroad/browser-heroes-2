import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { selectAvailableActions } from "../../selectors/selectAvailableActions";
import { selectTownView } from "../../selectors/selectTownView";
import {
	createTestRunState,
	createTestTownState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("restAtTown", () => {
	it.each([
		{ injured: false, depleted: false, fullyRested: true },
		{ injured: true, depleted: false, fullyRested: false },
		{ injured: false, depleted: true, fullyRested: false },
		{ injured: true, depleted: true, fullyRested: false },
	])(
		"keeps rest availability consistent when injured=$injured and depleted=$depleted",
		({ injured, depleted, fullyRested }) => {
			const state = modifyTestRunState(createTestTownState(), (draft) => {
				draft.gold = 100;
				if (injured) {
					draft.hero.currentHp = 1;
				}
				if (depleted) {
					draft.hero.skills[0].chargesRemaining = 0;
				}
			});

			expect(selectTownView(state)?.isFullyRested).toBe(fullyRested);
			expect(selectAvailableActions(state)).toContainEqual({ type: "ENTER_COMBAT" });
			expect(
				selectAvailableActions(state).some((action) => action.type === "REST_AT_TOWN"),
			).toBe(!fullyRested);

			const result = applyAction(state, { type: "REST_AT_TOWN" });
			expect(result.ok).toBe(!fullyRested);
			if (fullyRested) {
				expect(result).toMatchObject({
					ok: false,
					error: "HERO_FULLY_RESTED",
					state,
					events: [],
				});
			}
		},
	);

	it("rejects resting at full health with no skills", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.skills = [];
		});

		expect(applyAction(state, { type: "REST_AT_TOWN" })).toMatchObject({
			ok: false,
			error: "HERO_FULLY_RESTED",
			state,
		});
	});

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

	it("allows resting at full health to restore skill charges", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 100;
			draft.hero.skills[0].chargesRemaining = 0;
		});
		const currentHp = state.hero.currentHp;

		const result = applyAction(state, { type: "REST_AT_TOWN" });

		expect(result.ok).toBe(true);
		expect(result.state.hero.currentHp).toBe(currentHp);
		expect(result.state.hero.skills[0].chargesRemaining).toBeGreaterThan(0);
		expect(result.events).toContainEqual(
			expect.objectContaining({ type: "RESTED_AT_TOWN", hpRestored: 0 }),
		);
	});

	it("rejects resting without enough gold", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
			draft.hero.currentHp = 1;
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
