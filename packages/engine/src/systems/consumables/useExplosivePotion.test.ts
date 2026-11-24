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
} from "../../test/createTestRunState";
import { resolveConsumableEffect } from "./resolveConsumableEffect";

const usePotion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "explosivePotion" } as const;

function createPotionState(enemyFirst = false) {
	const state = createTestCombatState();
	const sourceId = state.combat!.enemy.sourceId;
	state.combat = createTestCombat();
	state.combat.enemy.sourceId = sourceId;
	state.combat.enemy.combatStats.initiative = enemyFirst ? 11 : 9;
	state.hero.consumables.explosivePotion = 2;
	state.rngState = { value: 0 };
	return { ...state, combat: state.combat };
}

describe("useConsumable (explosive potion)", () => {
	it("rolls exactly 3d6 with no attack, save, attribute, critical, or level scaling", () => {
		const combat = createTestCombat();
		combat.player.level = 100;
		combat.player.attributes.strength = 30;
		combat.player.attributes.intelligence = 30;
		combat.player.combatStats.criticalRangeBonus = 20;
		combat.player.combatStats.criticalDiceMultiplierBonus = 10;
		combat.enemy.combatStats.armourClass = 1000;
		combat.enemy.combatStats.savingThrowBonus = 1000;
		const before = structuredClone(combat);

		const result = resolveConsumableEffect(combat, CONSUMABLES_BY_ID.explosivePotion, {
			value: 0,
		});

		// Seed 0 rolls 2, 5, 4; the next RNG state proves no extra checks were rolled.
		expect(result.rngState).toEqual({ value: 2245583870 });
		expect(result.value.combat.enemy.currentHp).toBe(89);
		expect(result.value.outcomes).toEqual([
			{
				type: "damage",
				targetId: combat.enemy.id,
				targetName: combat.enemy.name,
				damageType: "fire",
				hpDamage: 11,
				absorbedDamage: 0,
				affinity: "normal",
				critical: false,
				halfDamageSave: false,
			},
		]);
		expect(combat).toEqual(before);
	});

	it.each([
		["resistances", 5, "resistant"],
		["vulnerabilities", 22, "vulnerable"],
		["immunities", 0, "immune"],
	] as const)("applies fire %s", (field, amount, affinity) => {
		const combat = createTestCombat();
		combat.enemy.combatStats.damageAffinities[field] = ["fire"];
		const result = resolveConsumableEffect(combat, CONSUMABLES_BY_ID.explosivePotion, {
			value: 0,
		});
		expect(result.value.combat.enemy.currentHp).toBe(100 - amount);
		expect(result.value.outcomes[0]).toMatchObject({ hpDamage: amount, affinity });
	});

	it("matches fire/other and unfiltered modifiers, ignores range and other classes, and absorbs shields", () => {
		const combat = createTestCombat();
		combat.player.combatStats.damageModifiers = [
			{ operation: "add", value: 3, damageType: "fire", damageClass: "other" },
			{ operation: "add", value: 100, damageClass: "magical" },
			{ operation: "add", value: 100, damageClass: "physical" },
			{ operation: "add", value: 100, attackRange: "ranged" },
			{ operation: "add", value: 100, attackRange: "melee" },
		];
		combat.enemy.combatStats.damageTakenModifiers = [{ operation: "multiply", value: 2 }];
		combat.enemy.activeEffects.push({
			id: "shield",
			type: "shield",
			remainingAmount: 5,
			sourceCombatantId: combat.enemy.id,
			sourceSide: "enemy",
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Shield",
				sourceEffectKey: "shield",
			},
			duration: { unit: "turns", remaining: 2 },
		});
		const result = resolveConsumableEffect(combat, CONSUMABLES_BY_ID.explosivePotion, {
			value: 0,
		});
		expect(result.value.outcomes[0]).toMatchObject({ hpDamage: 23, absorbedDamage: 5 });
		expect(result.value.combat.enemy.activeEffects).toEqual([]);
		expect(result.value.combat.enemy.currentHp).toBe(77);
	});

	it("consumes only the explosive potion, logs damage, and resolves a normal round while silenced", () => {
		const state = addPlayerStatus(createPotionState(), "silenced");
		expect(selectAvailableActions(state)).toContainEqual(usePotion);
		const result = applyAction(state, usePotion);
		expect(result.ok).toBe(true);
		expect(result.state.hero.consumables).toEqual({ healingPotion: 3, explosivePotion: 1 });
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

	it("ends combat with normal rewards before the enemy acts on a killing throw", () => {
		const state = createPotionState();
		state.combat.enemy.currentHp = 1;
		const result = applyAction(state, usePotion);
		expect(result.ok).toBe(true);
		expect(result.state.combat!.status).toBe("player_won");
		expect(result.state.kills).toBe(state.kills + 1);
		expect(result.state.gold).toBeGreaterThan(state.gold);
		expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toHaveLength(1);
		expect(
			result.state.combat!.log.some(
				(entry) => entry.actor === "enemy" && entry.eventType === "basic_attack",
			),
		).toBe(false);
	});

	it.each(["stun", "death"] as const)(
		"does not consume the potion when the enemy interrupts with %s",
		(interruption) => {
			const state = createPotionState(true);
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
			expect(result.state.hero.consumables.explosivePotion).toBe(2);
			expect(result.events.some((event) => event.type === "CONSUMABLE_USED")).toBe(false);
			expect(
				result.state.combat!.log.some((entry) => entry.eventType === "consumable_used"),
			).toBe(false);
			expect(result.state.combat!.status).toBe(
				interruption === "death" ? "enemy_won" : "active",
			);
		},
	);

	it("replays identically after saving and loading", () => {
		const state = createPotionState();
		const restored = deserializeRunStateJson(serializeRunState(state));
		expect(restored.ok).toBe(true);
		if (!restored.ok) {
			throw new Error(restored.error);
		}
		const result = applyAction(state, usePotion);
		expect(applyAction(restored.state, usePotion)).toEqual(result);
		expect(deserializeRunStateJson(serializeRunState(result.state))).toEqual({
			ok: true,
			state: result.state,
		});
	});

	it("rejects use with an empty inventory without advancing RNG", () => {
		const state = createPotionState();
		state.hero.consumables.explosivePotion = 0;
		expect(selectAvailableActions(state)).not.toContainEqual(usePotion);
		expect(applyAction(state, usePotion)).toMatchObject({
			ok: false,
			error: "NO_CONSUMABLES_AVAILABLE",
			state,
		});
	});

	it("projects the price and carry limit, buys a batch, and rejects overflow", () => {
		const state = createTestTownState();
		state.gold = 100;
		expect(selectTownView(state)!.consumables.explosivePotion).toEqual({
			name: "Explosive Potion",
			quantity: 0,
			maxCarry: 3,
			price: 9,
			canAfford: true,
			canBuy: true,
		});
		const buy = {
			type: "BUY_CONSUMABLE",
			consumableType: "explosivePotion",
			quantity: 3,
		} as const;
		expect(selectAvailableActions(state)).toContainEqual({ ...buy, quantity: 1 });
		const result = applyAction(state, buy);
		expect(result.ok).toBe(true);
		expect(result.state.gold).toBe(73);
		expect(result.state.hero.consumables).toEqual({ healingPotion: 3, explosivePotion: 3 });
		expect(result.events).toContainEqual({
			type: "CONSUMABLE_BOUGHT",
			consumableType: "explosivePotion",
			quantity: 3,
			cost: 27,
			remainingQuantity: 3,
		});
		expect(selectTownView(result.state)!.consumables.explosivePotion.canBuy).toBe(false);
		expect(applyAction(result.state, { ...buy, quantity: 1 })).toMatchObject({
			ok: false,
			error: "CONSUMABLES_FULL",
			state: result.state,
		});
	});
});
