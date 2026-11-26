import { createTestCombat } from "../../../../test/createTestCombat";
import { describe, expect, it } from "vitest";
import { createTestCombatState } from "../../../../test/createTestRunState";
import { formatActionOutcome } from "../../logs/formatActionLog";
import { resolveHealEffect } from "./resolveHealEffect";

describe("resolveHealEffect", () => {
	it.each([0, 3])("reports actual restored HP with %i HP missing", (missingHp) => {
		const state = createTestCombatState();
		const combat = state.combat!;
		combat.player.maxHp = 100;
		combat.player.currentHp = 100 - missingHp;

		const result = resolveHealEffect({
			combat,
			actorSide: "player",
			rngState: state.rngState,
			effect: { type: "heal", target: "self", dice: "1d4+100" },
		});

		expect(formatActionOutcome(result.value.outcomes[0]).outcome).toEqual({
			type: "healing",
			targetId: combat.player.id,
			amount: missingHp,
		});
	});

	it.each(["player", "enemy"] as const)(
		"resolves percentage healing for %s with rounding and healing modifiers",
		(actorSide) => {
			const combat = createTestCombat();
			const target = combat[actorSide];
			target.maxHp = 101;
			target.currentHp = 10;
			target.activeEffects.push({
				id: "healing-boost",
				type: "modifyHealing",
				multiplier: 1.5,
				sourceCombatantId: target.id,
				sourceSide: actorSide,
				source: {
					type: "skill",
					skillId: "armour",
					sourceName: "Boost",
					sourceEffectKey: "healing",
				},
				duration: { unit: "turns", remaining: 2 },
			});
			const result = resolveHealEffect({
				combat,
				actorSide,
				effect: { type: "heal", target: "self", percent: 0.5 },
				rngState: { value: 0 },
			});
			expect(result.value.outcomes).toEqual([
				{
					type: "healing",
					targetId: target.id,
					targetName: target.name,
					amount: 76,
				},
			]);
			expect(result.value.combat[actorSide].currentHp).toBe(86);
			expect(result.rngState).toEqual({ value: 0 });
		},
	);
});
