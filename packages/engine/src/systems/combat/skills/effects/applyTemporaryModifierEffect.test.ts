import { describe, expect, it } from "vitest";

import { modifyRollEffectSchema, type ModifyRollEffect } from "@app/content";

import { createTestRunState } from "../../../../test/createTestRunState";
import { applyTemporaryModifierEffect } from "./applyTemporaryModifierEffect";

const source = {
	type: "skill",
	skillId: "intimidating_shout",
	sourceName: "Intimidating Shout",
	sourceEffectKey: "effect:0",
} as const;

describe("applyTemporaryModifierEffect", () => {
	it("rejects half-damage outcomes for non-damage saving throws", () => {
		expect(
			modifyRollEffectSchema.safeParse({
				...createEffect(8),
				save: { ...createEffect(8).save, onSuccess: "halfDamage" },
			}).success,
		).toBe(false);
	});

	it("requires charges and a compatible roll type for automatic outcomes", () => {
		expect(
			modifyRollEffectSchema.safeParse({
				type: "modifyRoll",
				target: "enemy",
				roll: "attack",
				mode: "automaticFailure",
				durationTurns: 3,
			}).success,
		).toBe(false);

		expect(
			modifyRollEffectSchema.safeParse({
				type: "modifyRoll",
				target: "enemy",
				roll: "savingThrow",
				mode: "automaticCritical",
				charges: 1,
				durationTurns: 3,
			}).success,
		).toBe(false);
	});

	it("stores roll modifier charges on the active effect", () => {
		const combat = structuredClone(createTestRunState().combat!);
		const result = applyTemporaryModifierEffect({
			combat,
			actorSide: "player",
			effect: {
				type: "modifyRoll",
				target: "self",
				roll: "attack",
				mode: "automaticCritical",
				charges: 1,
				durationTurns: 3,
			},
			source,
			rngState: { value: 0 },
		});

		expect(result.value.combat.player.activeEffects).toContainEqual(
			expect.objectContaining({
				type: "modifyRoll",
				mode: "automaticCritical",
				remainingCharges: 1,
			}),
		);
	});

	it("does not apply a hostile modifier when its saving throw succeeds", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.enemy.attributes.wisdom = 30;
		combat.enemy.savingThrowProficiencies = ["wisdom"];

		const result = applyTemporaryModifierEffect({
			combat,
			actorSide: "player",
			effect: createEffect(1),
			source,
			rngState: { value: 0 },
		});

		expect(result.value.combat.enemy.activeEffects).toEqual(combat.enemy.activeEffects);
		expect(result.value.outcomes).toContainEqual(
			expect.objectContaining({ type: "resisted", targetName: combat.enemy.name }),
		);
	});

	it("applies a hostile modifier when its saving throw fails", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.enemy.attributes.wisdom = 1;
		combat.enemy.savingThrowProficiencies = [];

		const result = applyTemporaryModifierEffect({
			combat,
			actorSide: "player",
			effect: createEffect(30),
			source,
			rngState: { value: 0 },
		});

		expect(result.value.combat.enemy.activeEffects).toContainEqual(
			expect.objectContaining({ type: "modifyRoll", mode: "disadvantage" }),
		);
		expect(result.value.outcomes).toContainEqual(
			expect.objectContaining({ type: "modifier", targetName: combat.enemy.name }),
		);
	});
});

function createEffect(dcBase: number): ModifyRollEffect {
	return {
		type: "modifyRoll",
		target: "enemy",
		roll: "attack",
		mode: "disadvantage",
		durationTurns: 3,
		save: {
			attribute: "wisdom",
			onSuccess: "noEffect",
			dc: {
				base: dcBase,
				attribute: "strength",
				includeProficiency: true,
				bonus: 0,
			},
		},
	};
}
