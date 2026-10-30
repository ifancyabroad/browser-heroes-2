import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../../test/createTestCombat";
import { resolveDamageOverTimeEffects } from "./resolveDamageOverTimeEffects";

describe("resolveDamageOverTimeEffects", () => {
	it("records recurring damage as a structured damage outcome", () => {
		const combat = createTestCombat();
		const effectId = "burning";
		combat.enemy.activeEffects.push({
			id: effectId,
			type: "damageOverTime",
			sourceCombatantId: combat.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "burning_shot",
				sourceName: "Test burning effect",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns", remaining: 1 },
			damageType: "fire",
			damageClass: "magical",
			dice: "1d4",
		});

		const result = resolveDamageOverTimeEffects({
			combat,
			combatantSide: "enemy",
			effectIds: new Set([effectId]),
			rngState: { value: 0 },
		});

		expect(result.value.log.at(-1)).toEqual(
			expect.objectContaining({
				eventType: "effect_triggered",
				outcome: expect.objectContaining({
					type: "damage",
					targetId: combat.enemy.id,
					damageType: "fire",
					critical: false,
				}),
			}),
		);
	});
});
