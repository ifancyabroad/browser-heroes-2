import { describe, expect, it } from "vitest";
import type { ActiveCombatEffect } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { advanceActiveEffects, getActiveEffectIds } from "./advanceActiveEffects";
import { upsertActiveCombatEffect } from "./upsertActiveCombatEffect";

describe("upsertActiveCombatEffect", () => {
	it("adds an effect from a new source without mutating the combatant", () => {
		const combatant = createTestRunState().combat!.player;
		const original = structuredClone(combatant);
		const effect = createModifierEffect("new-effect", "new-source", 2, 1);

		const result = upsertActiveCombatEffect(combatant, effect);

		expect(result.activeEffects).toEqual([effect]);
		expect(combatant).toEqual(original);
	});

	it("replaces an effect from the same source with a new instance ID", () => {
		const existing = createModifierEffect("stable-id", "same-source", 1, 1);
		const replacement = createModifierEffect("replacement-id", "same-source", 3, 2);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};

		const result = upsertActiveCombatEffect(combatant, replacement);

		expect(result.activeEffects).toEqual([
			expect.objectContaining({
				id: "replacement-id",
				duration: { unit: "turns", remaining: 3 },
				value: 2,
			}),
		]);
		expect(result.activeEffects).toHaveLength(1);
	});

	it("does not advance a refreshed effect during the action that refreshed it", () => {
		const existing = createModifierEffect("existing-id", "same-source", 1, 1);
		const replacement = createModifierEffect("replacement-id", "same-source", 1, 2);
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};
		const effectIdsAtActionStart = getActiveEffectIds(combatant);

		const refreshed = upsertActiveCombatEffect(combatant, replacement);
		const advanced = advanceActiveEffects(refreshed, effectIdsAtActionStart);

		expect(advanced.combatant.activeEffects).toEqual([replacement]);
		expect(advanced.expiredEffects).toEqual([]);
	});

	it("refreshes the same authored effect across combatant IDs", () => {
		const existing = {
			...createModifierEffect("stable-id", "same-source", 2, -1),
			sourceCombatantId: "previous-enemy",
			sourceSide: "enemy" as const,
		};
		const replacement = {
			...createModifierEffect("replacement-id", "same-source", 3, -1),
			sourceCombatantId: "next-enemy",
			sourceSide: "enemy" as const,
		};
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};

		const result = upsertActiveCombatEffect(combatant, replacement);

		expect(result.activeEffects).toHaveLength(1);
		expect(result.activeEffects[0]).toMatchObject({
			id: "replacement-id",
			sourceCombatantId: "next-enemy",
			duration: { unit: "turns", remaining: 3 },
		});
	});

	it("keeps effects from distinct authored skills independent", () => {
		const existing = createModifierEffect("first", "effect:0", 2, 1);
		const otherSkill = {
			...createModifierEffect("second", "effect:0", 2, 1),
			source: {
				...createModifierEffect("second", "effect:0", 2, 1).source,
				skillId: "bless" as const,
			},
		};
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};

		const result = upsertActiveCombatEffect(combatant, otherSkill);

		expect(result.activeEffects).toEqual([existing, otherSkill]);
	});

	it("keeps identically named basic attacks from distinct definitions independent", () => {
		const existing = createBasicAttackEffect("first", "giant_spider:mainHand");
		const otherDefinition = createBasicAttackEffect("second", "vampire_bat:mainHand");
		const combatant = {
			...createTestRunState().combat!.player,
			activeEffects: [existing],
		};

		const result = upsertActiveCombatEffect(combatant, otherDefinition);

		expect(result.activeEffects).toEqual([existing, otherDefinition]);
	});
});

function createBasicAttackEffect(id: string, sourceDefinitionId: string): ActiveCombatEffect {
	return {
		...createModifierEffect(id, "basicAttack:mainHand:rider:0:effect:0", 2, -1),
		source: {
			type: "basicAttack",
			sourceDefinitionId,
			sourceName: "Bite",
			sourceEffectKey: "basicAttack:mainHand:rider:0:effect:0",
		},
	};
}

function createModifierEffect(
	id: string,
	sourceEffectKey: string,
	remaining: number,
	value: number,
): ActiveCombatEffect {
	return {
		id,
		type: "modifyStat",
		sourceCombatantId: "player",
		sourceSide: "player",
		source: {
			type: "skill",
			skillId: "armour_break",
			sourceName: "Test Modifier",
			sourceEffectKey,
		},
		duration: { unit: "turns", remaining },
		stat: "armourClass",
		value,
	};
}
