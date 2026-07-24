import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	addPlayerStatus,
	createTestRunState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("useHealingPotion", () => {
	it("heals, consumes one potion, emits an event, and advances the round", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			draft.hero.currentHp = 1;
			draft.combat!.player.currentHp = 1;
		});

		const result = applyAction(state, {
			type: "PLAYER_USE_CONSUMABLE",
			consumableType: "healingPotion",
		});

		expect(result.ok).toBe(true);
		expect(result.state.hero.healingPotions).toBe(state.hero.healingPotions - 1);
		expect(result.state.combat!.turnNumber).toBe(state.combat!.turnNumber + 1);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "HEALING_POTION_USED",
				remainingPotions: state.hero.healingPotions - 1,
			}),
		);
	});

	it("rejects use with no potions or while stunned", () => {
		const empty = modifyTestRunState(createTestRunState(), (draft) => {
			draft.hero.healingPotions = 0;
		});
		expect(
			applyAction(empty, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "NO_HEALING_POTIONS_AVAILABLE" });

		const stunned = addPlayerStatus(createTestRunState(), "stunned");
		expect(
			applyAction(stunned, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "PLAYER_CANNOT_ACT" });
	});
});
