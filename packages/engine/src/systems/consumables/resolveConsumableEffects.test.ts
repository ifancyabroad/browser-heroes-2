import type { Consumable, ConsumableEffect } from "@app/content";
import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../test/createTestCombat";
import { resolveSkillEffects } from "../combat/skills/resolveSkillEffects";
import { hasActiveStatus } from "../combat/effects/statuses/hasActiveStatus";
import { getEffectiveCombatStatValue } from "../combat/effects/modifiers/getEffectiveCombatStatValue";
import { resolveConsumableEffects } from "./resolveConsumableEffects";

const duration = { unit: "turns", value: 2 } as const;
const hasteEffect = { type: "applyStatus", target: "self", statusId: "haste", duration } as const;

function createConsumable(effects: ConsumableEffect[]): Consumable {
	return {
		id: "speedPotion",
		name: "Test potion",
		icon: "test.png",
		basePrice: 1,
		maxCarry: 1,
		effects,
	};
}

describe("resolveConsumableEffects", () => {
	it("applies Haste without changing Initiative, consuming RNG or mutating the input", () => {
		const combat = createTestCombat();
		combat.enemy.combatStats.initiative = 10000;
		const before = structuredClone(combat);
		const result = resolveConsumableEffects(combat, createConsumable([hasteEffect]), {
			value: 0,
		});
		expect(result.rngState).toEqual({ value: 0 });
		expect(result.value.combat.player.combatStats).toEqual(before.player.combatStats);
		expect(hasActiveStatus(result.value.combat.player, "haste")).toBe(true);
		expect(combat).toEqual(before);
	});

	it("uses the same status mechanics as skills while retaining consumable provenance", () => {
		const combat = createTestCombat();
		const skill = resolveSkillEffects({
			combat,
			actorSide: "player",
			skillId: "armour",
			skillName: "Test skill",
			effects: [hasteEffect],
			rngState: { value: 0 },
		});
		const potion = resolveConsumableEffects(combat, createConsumable([hasteEffect]), {
			value: 0,
		});
		expect(skill.value.player.activeEffects[0]).toEqual({
			...potion.value.combat.player.activeEffects[0],
			source: {
				type: "skill",
				skillId: "armour",
				sourceName: "Test skill",
				sourceEffectKey: "effect:0",
			},
		});
		expect(potion.value.combat.player.activeEffects[0].source).toEqual({
			type: "consumable",
			consumableId: "speedPotion",
			sourceName: "Test potion",
			sourceEffectKey: "effect:0",
		});
		expect(potion.rngState).toEqual(skill.rngState);
	});

	it("resolves effects in order, applying healing modifiers before percentage healing", () => {
		const combat = createTestCombat();
		combat.player.currentHp = 10;
		const potion = createConsumable([
			{ type: "modifyHealing", target: "self", multiplier: 2, duration },
			{ type: "heal", target: "self", percent: 0.25 },
		]);
		const result = resolveConsumableEffects(combat, potion, { value: 0 });
		expect(result.value.combat.player.currentHp).toBe(60);
		expect(result.value.outcomes.map((outcome) => outcome.type)).toEqual([
			"modifier",
			"healing",
		]);
		expect(result.value.outcomes[1]).toMatchObject({ amount: 50 });
		expect(result.rngState).toEqual({ value: 0 });
	});

	it("threads RNG and damage through successive effects", () => {
		const damage = {
			type: "damage",
			target: "enemy",
			dice: "1d4",
			damageType: "fire",
			damageClass: "other",
			requiresAttackRoll: false,
		} as const;
		const result = resolveConsumableEffects(
			createTestCombat(),
			createConsumable([damage, damage]),
			{ value: 0 },
		);
		expect(result.value.combat.enemy.currentHp).toBe(95);
		expect(result.value.outcomes).toMatchObject([
			{ type: "damage", hpDamage: 2 },
			{ type: "damage", hpDamage: 3 },
		]);
		expect(result.rngState).toEqual({ value: 3078035022 });
	});

	it("keeps same-type modifiers distinct and refreshes each indexed source", () => {
		const potion = createConsumable([
			{ type: "modifyStat", target: "self", stat: "armourClass", value: 2, duration },
			{ type: "modifyStat", target: "self", stat: "armourClass", value: 3, duration },
		]);
		const first = resolveConsumableEffects(createTestCombat(), potion, { value: 0 });
		const second = resolveConsumableEffects(
			{ ...first.value.combat, turnNumber: 2 },
			potion,
			first.rngState,
		);
		expect(second.value.combat.player.activeEffects).toHaveLength(2);
		expect(
			second.value.combat.player.activeEffects.map((effect) => effect.source.sourceEffectKey),
		).toEqual(["effect:0", "effect:1"]);
		expect(getEffectiveCombatStatValue(second.value.combat.player, "armourClass")).toBe(15);
		expect(second.value.outcomes).toMatchObject([{ refreshed: true }, { refreshed: true }]);
	});

	it("supports shields and recurring healing and damage through their existing handlers", () => {
		const potion = createConsumable([
			{ type: "shield", target: "self", amount: 8, duration },
			{ type: "healOverTime", target: "self", dice: "1d4", duration },
			{
				type: "damageOverTime",
				target: "enemy",
				dice: "1d4",
				damageType: "poison",
				damageClass: "other",
				duration,
			},
		]);
		const result = resolveConsumableEffects(createTestCombat(), potion, { value: 0 });
		expect(result.value.combat.player.activeEffects).toMatchObject([
			{ type: "shield", remainingAmount: 8 },
			{ type: "healOverTime", dice: "1d4" },
		]);
		expect(result.value.combat.enemy.activeEffects).toMatchObject([
			{ type: "damageOverTime", source: { type: "consumable", sourceEffectKey: "effect:2" } },
		]);
		expect(result.value.combat.enemy.currentHp).toBe(100);
		expect(result.rngState).toEqual({ value: 0 });
	});
});
