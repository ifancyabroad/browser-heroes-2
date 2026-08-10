import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveDamageOverTimeEffects } from "./resolveDamageOverTimeEffects";

describe("resolveDamageOverTimeEffects", () => {
	it("records recurring damage as a structured damage outcome", () => {
		const combat = structuredClone(createTestRunState().combat!);
		const effectId = "burning";
		combat.enemy.activeEffects.push({
			id: effectId,
			type: "damageOverTime",
			sourceCombatantId: combat.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "burn",
				sourceName: "Burn",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns", remaining: 1 },
			damageType: "fire",
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
