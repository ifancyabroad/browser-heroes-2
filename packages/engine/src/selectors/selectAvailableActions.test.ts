import { describe, expect, it } from "vitest";
import { selectAvailableActions } from "./selectAvailableActions";
import {
	addPlayerStatus,
	createTestRunState,
	createTestTownState,
	createTestVictoryState,
	modifyTestRunState,
} from "../test/createTestRunState";

describe("selectAvailableActions", () => {
	it("returns combat actions for an active player", () => {
		expect(createActionTypes(createTestRunState())).toEqual([
			"PLAYER_BASIC_ATTACK",
			"PLAYER_USE_SKILL",
			"PLAYER_USE_CONSUMABLE",
			"PLAYER_SKIP_TURN",
		]);
	});

	it("only permits skipping while stunned", () => {
		expect(createActionTypes(addPlayerStatus(createTestRunState(), "stunned"))).toEqual([
			"PLAYER_SKIP_TURN",
		]);
	});

	it("removes skills while silenced", () => {
		expect(createActionTypes(addPlayerStatus(createTestRunState(), "silenced"))).toEqual([
			"PLAYER_BASIC_ATTACK",
			"PLAYER_USE_CONSUMABLE",
			"PLAYER_SKIP_TURN",
		]);
	});

	it("omits depleted skills and unavailable potions", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			draft.hero.healingPotions = 0;
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}
			draft.combat.player.skills[0].chargesRemaining = 0;
		});

		expect(createActionTypes(state)).toEqual(["PLAYER_BASIC_ATTACK", "PLAYER_SKIP_TURN"]);
	});

	it("offers progression choices after an ordinary victory", () => {
		expect(createActionTypes(createTestVictoryState())).toEqual([
			"CONTINUE_TO_NEXT_COMBAT",
			"RETURN_TO_TOWN",
		]);
	});

	it("also offers retirement after final-boss victory", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.battleNumber = 100;
			draft.zoneNumber = 10;
		});

		expect(createActionTypes(state)).toEqual([
			"CONTINUE_TO_NEXT_COMBAT",
			"RETURN_TO_TOWN",
			"RETIRE_RUN",
		]);
	});

	it("always permits entering combat from town", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			draft.gold = 0;
		});

		expect(createActionTypes(state)).toEqual([
			"ENTER_COMBAT",
			...Array.from({ length: 6 }, () => "SET_SHOP_LOCK" as const),
		]);
	});

	it.each(["dead", "retired"] as const)("returns no actions for a %s run", (phase) => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			draft.phase = phase;
		});

		expect(selectAvailableActions(state)).toEqual([]);
	});

	it("does not mutate its input", () => {
		const state = createTestRunState();
		const original = structuredClone(state);

		selectAvailableActions(state);

		expect(state).toEqual(original);
	});
});

function createActionTypes(state: ReturnType<typeof createTestRunState>) {
	return selectAvailableActions(state).map((action) => action.type);
}
