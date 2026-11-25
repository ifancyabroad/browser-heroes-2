import { describe, expect, it } from "vitest";
import type { ConsumableId } from "@app/content";
import { applyAction } from "../../actions";
import { selectAvailableActions } from "../../selectors/selectAvailableActions";
import { createTestCombat } from "../../test/createTestCombat";
import {
	addPlayerStatus,
	createTestCombatState,
	modifyTestRunState,
} from "../../test/createTestRunState";

function createConsumableState(consumableType: ConsumableId) {
	const state = createTestCombatState();
	const sourceId = state.combat!.enemy.sourceId;
	const combat = createTestCombat();
	combat.enemy.sourceId = sourceId;
	combat.enemy.combatStats.initiative = 9;
	state.hero.consumables[consumableType] = 2;
	return { ...state, combat, rngState: { value: 0 } };
}
describe("useConsumable", () => {
	describe("healing", () => {
		it("allows use while silenced and leaves skill charges untouched", () => {
			const state = addPlayerStatus(createTestCombatState(), "silenced");
			const result = applyAction(state, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			});
			expect(result.ok).toBe(true);
			expect(result.state.hero.consumables.healingPotion).toBe(2);
			expect(result.state.hero.skills).toEqual(state.hero.skills);
			expect(result.events.filter((event) => event.type === "CONSUMABLE_USED")).toHaveLength(
				1,
			);
		});

		it.each([0, 3])("reports actual restored HP with %i HP missing", (missingHp) => {
			const state = modifyTestRunState(createTestCombatState(), (draft) => {
				draft.combat!.player.maxHp = 100;
				draft.combat!.player.currentHp = 100 - missingHp;
				draft.hero.currentHp = draft.combat!.player.currentHp;
			});

			const result = applyAction(state, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			});

			expect(result.ok).toBe(true);
			expect(
				result.state.combat!.log.find(
					(entry) => entry.eventType === "healing_done" && entry.actor === "player",
				)?.outcome,
			).toEqual({ type: "healing", targetId: state.combat!.player.id, amount: missingHp });
		});

		it("heals, consumes one potion, emits an event, and advances the round", () => {
			const state = modifyTestRunState(createTestCombatState(), (draft) => {
				draft.hero.currentHp = 1;
				draft.combat!.player.currentHp = 1;
			});

			const result = applyAction(state, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			});

			expect(result.ok).toBe(true);
			expect(result.state.hero.consumables.healingPotion).toBe(
				state.hero.consumables.healingPotion - 1,
			);
			expect(result.state.combat!.turnNumber).toBe(state.combat!.turnNumber + 1);
			expect(result.events).toContainEqual(
				expect.objectContaining({
					type: "CONSUMABLE_USED",
					consumableType: "healingPotion",
					remainingQuantity: state.hero.consumables.healingPotion - 1,
				}),
			);
		});
	});

	describe("explosive", () => {
		const usePotion = {
			type: "PLAYER_USE_CONSUMABLE",
			consumableType: "explosivePotion",
		} as const;
		it("consumes only the explosive potion, logs damage, and resolves a normal round while silenced", () => {
			const state = addPlayerStatus(createConsumableState("explosivePotion"), "silenced");
			expect(selectAvailableActions(state)).toContainEqual(usePotion);
			const result = applyAction(state, usePotion);
			expect(result.ok).toBe(true);
			expect(result.state.hero.consumables).toEqual({
				healingPotion: 3,
				explosivePotion: 1,
				speedPotion: 0,
				invisibilityPotion: 0,
			});
			expect(result.state.combat!.turnNumber).toBe(2);
			expect(
				result.state.combat!.log.filter((entry) => entry.eventType === "consumable_used"),
			).toHaveLength(1);
			expect(result.state.combat!.log).toContainEqual(
				expect.objectContaining({
					actor: "player",
					eventType: "damage_dealt",
					outcome: expect.objectContaining({
						type: "damage",
						damageType: "fire",
						critical: false,
					}),
				}),
			);
			expect(result.events).toContainEqual({
				type: "CONSUMABLE_USED",
				consumableType: "explosivePotion",
				remainingQuantity: 1,
			});
			expect(result.events).toContainEqual({ type: "COMBAT_TURN_RESOLVED" });
		});
	});

	describe("status", () => {
		const usePotion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "speedPotion" } as const;
		it("refreshes the same source instead of stacking effects", () => {
			const first = applyAction(createConsumableState("speedPotion"), usePotion);
			const second = applyAction(first.state, usePotion);
			expect(second.ok).toBe(true);
			expect(second.state.hero.consumables.speedPotion).toBe(0);
			expect(
				second.state.combat!.player.activeEffects.filter(
					(effect) => effect.type === "status" && effect.statusId === "haste",
				),
			).toHaveLength(1);
			expect(second.state.combat!.log).toContainEqual(
				expect.objectContaining({
					eventType: "effect_applied",
					message: "Haste on Test player is refreshed for 1 battle.",
				}),
			);
		});
	});
});
