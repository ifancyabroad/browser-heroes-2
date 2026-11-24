import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { CONSUMABLES_BY_ID } from "@app/content";
import { resolveConsumableEffect } from "./resolveConsumableEffect";
import {
	addPlayerStatus,
	createTestCombatState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("useConsumable (healing potion)", () => {
	it("resolves percentage healing with the existing rounding and healing modifiers", () => {
		const combat = createTestCombatState().combat!;
		combat.player.maxHp = 101;
		combat.player.currentHp = 10;
		combat.player.activeEffects.push({
			id: "healing-boost",
			type: "modifyHealing",
			multiplier: 1.5,
			sourceCombatantId: combat.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Boost",
				sourceEffectKey: "healing",
			},
			duration: { unit: "turns", remaining: 2 },
		});
		const result = resolveConsumableEffect(combat, CONSUMABLES_BY_ID.healingPotion, {
			value: 0,
		});
		expect(result.value.outcomes).toEqual([
			{
				type: "healing",
				targetId: combat.player.id,
				targetName: combat.player.name,
				amount: 76,
			},
		]);
		expect(result.value.combat.player.currentHp).toBe(86);
		expect(result.rngState).toEqual({ value: 0 });
	});

	it("allows use while silenced and leaves skill charges untouched", () => {
		const state = addPlayerStatus(createTestCombatState(), "silenced");
		const result = applyAction(state, {
			type: "PLAYER_USE_CONSUMABLE",
			consumableType: "healingPotion",
		});
		expect(result.ok).toBe(true);
		expect(result.state.hero.consumables.healingPotion).toBe(2);
		expect(result.state.hero.skills).toEqual(state.hero.skills);
		expect(result.events.filter((event) => event.type === "CONSUMABLE_USED")).toHaveLength(1);
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

	it("rejects use with no potions or while stunned", () => {
		const empty = modifyTestRunState(createTestCombatState(), (draft) => {
			draft.hero.consumables.healingPotion = 0;
		});
		expect(
			applyAction(empty, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "NO_CONSUMABLES_AVAILABLE" });

		const stunned = addPlayerStatus(createTestCombatState(), "stunned");
		expect(
			applyAction(stunned, {
				type: "PLAYER_USE_CONSUMABLE",
				consumableType: "healingPotion",
			}),
		).toMatchObject({ ok: false, error: "PLAYER_CANNOT_ACT" });
	});
});
