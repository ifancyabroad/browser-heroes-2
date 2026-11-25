import { CONSUMABLES_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import { deserializeRunStateJson } from "../../serialization/deserializeRunState";
import { serializeRunState } from "../../serialization/serializeRunState";
import { selectAvailableActions } from "../../selectors/selectAvailableActions";
import { selectTownView } from "../../selectors/selectTownView";
import { createTestCombat } from "../../test/createTestCombat";
import {
	addPlayerStatus,
	createTestCombatState,
	createTestTownState,
	createTestVictoryState,
} from "../../test/createTestRunState";
import { getCombatTurnOrder } from "../combat/rounds/getCombatTurnOrder";
import { resolveConsumableEffect } from "./resolveConsumableEffect";

const usePotion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "speedPotion" } as const;

function createSpeedState() {
	const state = createTestCombatState();
	const sourceId = state.combat!.enemy.sourceId;
	state.combat = createTestCombat();
	state.combat.enemy.sourceId = sourceId;
	state.combat.enemy.combatStats.initiative = 10000;
	state.hero.consumables.speedPotion = 2;
	return { ...state, combat: state.combat };
}

describe("useConsumable (speed potion)", () => {
	it("preserves the drinking round's order and guarantees first action in later rounds", () => {
		const state = createSpeedState();
		expect(selectAvailableActions(state)).toContainEqual(usePotion);
		const first = applyAction(state, usePotion);
		expect(first.ok).toBe(true);
		expect(
			first.state
				.combat!.log.filter(
					(entry) =>
						entry.eventType === "consumable_used" || entry.eventType === "basic_attack",
				)
				.map((entry) => entry.actor),
		).toEqual(["enemy", "player"]);
		expect(first.state.hero.consumables).toEqual({
			healingPotion: 3,
			explosivePotion: 0,
			speedPotion: 1,
		});
		expect(first.events).toContainEqual({
			type: "CONSUMABLE_USED",
			consumableType: "speedPotion",
			remainingQuantity: 1,
		});
		expect(first.events).toContainEqual({ type: "COMBAT_TURN_RESOLVED" });
		expect(first.state.combat!.player.activeEffects).toEqual([
			expect.objectContaining({
				type: "actFirst",
				duration: { unit: "battles", remaining: 1 },
				source: {
					type: "consumable",
					consumableId: "speedPotion",
					sourceName: "Potion of Speed",
					sourceEffectKey: "effect:0",
				},
			}),
		]);
		expect(first.state.combat!.log).toContainEqual(
			expect.objectContaining({
				eventType: "effect_applied",
				message: "Test player acts first for 1 battle.",
			}),
		);

		const second = applyAction(first.state, { type: "PLAYER_SKIP_TURN" });
		expect(second.ok).toBe(true);
		expect(
			second.state
				.combat!.log.filter(
					(entry) =>
						entry.turnNumber === 2 &&
						(entry.eventType === "turn_skipped" || entry.eventType === "basic_attack"),
				)
				.map((entry) => entry.actor),
		).toEqual(["player", "enemy"]);
		expect(second.state.combat!.player.activeEffects).toEqual(
			first.state.combat!.player.activeEffects,
		);
	});

	it("applies the effect without changing Initiative or consuming RNG", () => {
		const state = createSpeedState();
		const before = structuredClone(state.combat);
		const result = resolveConsumableEffect(
			state.combat,
			CONSUMABLES_BY_ID.speedPotion,
			state.rngState,
		);
		expect(result.rngState).toEqual(state.rngState);
		expect(result.value.combat.player.combatStats).toEqual(before.player.combatStats);
		expect(getCombatTurnOrder(result.value.combat)).toEqual(["player", "enemy"]);
		expect(state.combat).toEqual(before);
	});

	it("refreshes the same source instead of stacking effects", () => {
		const first = applyAction(createSpeedState(), usePotion);
		const second = applyAction(first.state, usePotion);
		expect(second.ok).toBe(true);
		expect(second.state.hero.consumables.speedPotion).toBe(0);
		expect(
			second.state.combat!.player.activeEffects.filter(
				(effect) => effect.type === "actFirst",
			),
		).toHaveLength(1);
		expect(second.state.combat!.log).toContainEqual(
			expect.objectContaining({
				eventType: "effect_applied",
				message: "Test player's turn priority is refreshed for 1 battle.",
			}),
		);
	});

	it("allows drinking while silenced, but rejects empty inventory and a stunned drinker", () => {
		const state = createSpeedState();
		expect(applyAction(addPlayerStatus(state, "silenced"), usePotion).ok).toBe(true);
		expect(applyAction(addPlayerStatus(state, "stunned"), usePotion)).toMatchObject({
			ok: false,
			error: "PLAYER_CANNOT_ACT",
		});
		state.hero.consumables.speedPotion = 0;
		expect(selectAvailableActions(state)).not.toContainEqual(usePotion);
		expect(applyAction(state, usePotion)).toMatchObject({
			ok: false,
			error: "NO_CONSUMABLES_AVAILABLE",
			state,
		});
	});

	it.each(["stun", "death"] as const)(
		"does not consume or apply the potion after interruption by %s",
		(interruption) => {
			const state = createSpeedState();
			const enemy = state.combat.enemy;
			enemy.activeEffects.push({
				id: "hit",
				type: "modifyRoll",
				roll: "attack",
				mode: "automaticSuccess",
				sourceCombatantId: enemy.id,
				sourceSide: "enemy",
				source: {
					type: "skill",
					skillId: "focus_energy",
					sourceName: "Hit",
					sourceEffectKey: "hit",
				},
				duration: { unit: "battles", remaining: 1 },
			});
			if (interruption === "death") {
				enemy.basicAttack.damage.dice = "1d4+1000";
			} else {
				enemy.basicAttack.attackRiders.push({
					timing: "onHit",
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 1 },
						},
					],
				});
			}
			const result = applyAction(state, usePotion);
			expect(result.ok).toBe(true);
			expect(result.state.hero.consumables.speedPotion).toBe(2);
			expect(
				result.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "actFirst",
				),
			).toBe(false);
			expect(result.events.some((event) => event.type === "CONSUMABLE_USED")).toBe(false);
		},
	);

	it("preserves priority through a stunned skip without allowing the hero to act", () => {
		const first = applyAction(createSpeedState(), usePotion);
		const stunned = addPlayerStatus(first.state, "stunned");
		const result = applyAction(stunned, { type: "PLAYER_SKIP_TURN" });
		expect(result.ok).toBe(true);
		expect(
			result.state
				.combat!.log.filter(
					(entry) =>
						entry.turnNumber === 2 &&
						(entry.eventType === "turn_skipped" || entry.eventType === "basic_attack"),
				)
				.map((entry) => [entry.actor, entry.eventType]),
		).toEqual([
			["player", "turn_skipped"],
			["enemy", "basic_attack"],
		]);
		expect(result.state.combat!.player.activeEffects).toEqual(
			first.state.combat!.player.activeEffects,
		);
	});

	it.each(["CONTINUE_TO_NEXT_COMBAT", "RETURN_TO_TOWN"] as const)(
		"does not carry speed into the next encounter after %s",
		(type) => {
			const state = createTestVictoryState();
			state.combat = resolveConsumableEffect(
				state.combat!,
				CONSUMABLES_BY_ID.speedPotion,
				state.rngState,
			).value.combat;
			const transition = applyAction(state, { type });
			expect(transition.ok).toBe(true);
			const next =
				type === "RETURN_TO_TOWN"
					? applyAction(transition.state, { type: "ENTER_COMBAT" })
					: transition;
			expect(next.ok).toBe(true);
			expect(
				next.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "actFirst",
				),
			).toBe(false);
		},
	);

	it("preserves the effect and deterministic turn order through save/load", () => {
		const first = applyAction(createSpeedState(), usePotion);
		const restored = deserializeRunStateJson(serializeRunState(first.state));
		expect(restored.ok).toBe(true);
		if (!restored.ok) {
			throw new Error(restored.error);
		}
		expect(applyAction(restored.state, { type: "PLAYER_SKIP_TURN" })).toEqual(
			applyAction(first.state, { type: "PLAYER_SKIP_TURN" }),
		);
	});

	it("uses Initiative if both combatants have priority, and supports enemy priority", () => {
		const state = createSpeedState();
		const combat = resolveConsumableEffect(
			state.combat,
			CONSUMABLES_BY_ID.speedPotion,
			state.rngState,
		).value.combat;
		const effect = combat.player.activeEffects[0];
		combat.enemy.activeEffects = [
			{
				...effect,
				id: "enemy-speed",
				sourceCombatantId: combat.enemy.id,
				sourceSide: "enemy",
			},
		];
		expect(getCombatTurnOrder(combat)).toEqual(["enemy", "player"]);
		combat.enemy.combatStats.initiative = combat.player.combatStats.initiative;
		expect(getCombatTurnOrder(combat)).toEqual(["player", "enemy"]);
		combat.player.activeEffects = [];
		expect(getCombatTurnOrder(combat)).toEqual(["enemy", "player"]);
	});

	it("buys up to two potions at the projected price and rejects overflow", () => {
		const state = createTestTownState();
		state.gold = 100;
		expect(selectTownView(state)!.consumables.speedPotion).toEqual({
			name: "Potion of Speed",
			quantity: 0,
			maxCarry: 2,
			price: 28,
			canAfford: true,
			canBuy: true,
		});
		const buy = { type: "BUY_CONSUMABLE", consumableType: "speedPotion", quantity: 2 } as const;
		expect(selectAvailableActions(state)).toContainEqual({ ...buy, quantity: 1 });
		const result = applyAction(state, buy);
		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(44);
		expect(result.state.hero.consumables.speedPotion).toBe(2);
		expect(result.events).toContainEqual({
			type: "CONSUMABLE_BOUGHT",
			consumableType: "speedPotion",
			quantity: 2,
			cost: 56,
			remainingQuantity: 2,
		});
		expect(selectTownView(result.state)!.consumables.speedPotion.canBuy).toBe(false);
		expect(applyAction(result.state, { ...buy, quantity: 1 })).toMatchObject({
			ok: false,
			error: "CONSUMABLES_FULL",
			state: result.state,
		});
	});
});
