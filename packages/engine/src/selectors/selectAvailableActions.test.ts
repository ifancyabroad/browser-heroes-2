import { createTestCombat, createTestStatus } from "../test/createTestCombat";
import { describe, expect, it } from "vitest";
import { selectAvailableActions } from "./selectAvailableActions";
import {
	addPlayerStatus,
	createTestCombatState,
	createTestRunState,
	createTestTownState,
	createTestVictoryState,
	modifyTestRunState,
} from "../test/createTestRunState";

describe("selectAvailableActions", () => {
	it("returns combat actions for an active player", () => {
		expect(createActionTypes(createTestCombatState())).toEqual([
			"PLAYER_BASIC_ATTACK",
			"PLAYER_USE_SKILL",
			"PLAYER_USE_CONSUMABLE",
			"PLAYER_SKIP_TURN",
		]);
	});

	it("only permits skipping while stunned", () => {
		expect(createActionTypes(addPlayerStatus(createTestCombatState(), "stunned"))).toEqual([
			"PLAYER_SKIP_TURN",
		]);
	});

	it("removes skills while silenced", () => {
		expect(createActionTypes(addPlayerStatus(createTestCombatState(), "silenced"))).toEqual([
			"PLAYER_BASIC_ATTACK",
			"PLAYER_USE_CONSUMABLE",
			"PLAYER_SKIP_TURN",
		]);
	});

	it("omits depleted skills and unavailable potions", () => {
		const state = modifyTestRunState(createTestCombatState(), (draft) => {
			draft.hero.consumables.healingPotion = 0;
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
		const state = modifyTestRunState(createTestCombatState(), (draft) => {
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

	it.each([
		{ consumableType: "healingPotion", quantity: 0, gold: 0, canBuy: false },
		{ consumableType: "healingPotion", quantity: 0, gold: 1000, canBuy: true },
		{ consumableType: "healingPotion", quantity: 3, gold: 1000, canBuy: false },
		{ consumableType: "explosivePotion", quantity: 0, gold: 100, canBuy: true },
		{ consumableType: "speedPotion", quantity: 0, gold: 100, canBuy: true },
	] as const)(
		"offers $consumableType with $quantity potions and $gold gold",
		({ consumableType, quantity, gold, canBuy }) => {
			const state = createTestTownState();
			state.hero.consumables[consumableType] = quantity;
			state.gold = gold;
			expect(
				selectAvailableActions(state).some(
					(action) =>
						action.type === "BUY_CONSUMABLE" &&
						action.consumableType === consumableType,
				),
			).toBe(canBuy);
		},
	);
});

function createActionTypes(state: ReturnType<typeof createTestCombatState>) {
	return selectAvailableActions(state).map((action) => action.type);
}

describe("selectAvailableActions targeting", () => {
	it("excludes opponent-targeting actions while retaining self-targeted actions and skip", () => {
		const state = createTestCombatState();
		state.combat = createTestCombat();
		state.combat.enemy.activeEffects.push(createTestStatus(state.combat.enemy, "invisible", 3));
		state.combat.player.skills = [
			{ skillId: "armour", chargesRemaining: 2 },
			{ skillId: "shocking_grasp", chargesRemaining: 2 },
		];
		state.hero.consumables.healingPotion = 1;
		state.hero.consumables.explosivePotion = 1;
		state.hero.consumables.speedPotion = 1;
		state.hero.consumables.invisibilityPotion = 1;
		expect(selectAvailableActions(state)).toEqual([
			{ type: "PLAYER_USE_SKILL", skillId: "armour" },
			{ type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" },
			{ type: "PLAYER_USE_CONSUMABLE", consumableType: "invisibilityPotion" },
			{ type: "PLAYER_USE_CONSUMABLE", consumableType: "speedPotion" },
			{ type: "PLAYER_SKIP_TURN" },
		]);
	});
});
