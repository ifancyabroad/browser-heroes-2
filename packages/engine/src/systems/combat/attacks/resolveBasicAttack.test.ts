import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../../test/createTestRunState";
import { resolveBasicAttack } from "./resolveBasicAttack";

describe("resolveBasicAttack charged roll modifiers", () => {
	it("consumes an automatic miss during a basic attack", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.player.activeEffects.push({
			id: "automatic-miss",
			type: "modifyRoll",
			sourceCombatantId: combat.enemy.id,
			source: {
				type: "skill",
				skillId: "cruel_deception",
				sourceName: "Cruel Deception",
				sourceEffectKey: "effect:0",
			},
			remainingTurns: 4,
			remainingCharges: 1,
			roll: "attack",
			mode: "automaticFailure",
		});
		const enemyHp = combat.enemy.currentHp;

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: { value: 36 },
		});

		expect(result.value.enemy.currentHp).toBe(enemyHp);
		expect(result.value.player.activeEffects).toEqual([]);
		expect(result.value.log.at(-1)?.message).toContain("The attack misses");
	});

	it("decrements charged advantage without removing duration-based modifiers", () => {
		const combat = structuredClone(createTestRunState().combat!);
		combat.player.activeEffects.push(
			{
				id: "charged-advantage",
				type: "modifyRoll",
				sourceCombatantId: combat.player.id,
				source: {
					type: "skill",
					skillId: "focus_energy",
					sourceName: "Focus Energy",
					sourceEffectKey: "effect:0",
				},
				remainingTurns: 4,
				remainingCharges: 2,
				roll: "attack",
				mode: "advantage",
			},
			{
				id: "duration-advantage",
				type: "modifyRoll",
				sourceCombatantId: combat.player.id,
				source: {
					type: "skill",
					skillId: "dancing_defense",
					sourceName: "Dancing Defense",
					sourceEffectKey: "effect:0",
				},
				remainingTurns: 4,
				roll: "attack",
				mode: "advantage",
			},
		);

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: { value: 0 },
		});

		expect(result.value.player.activeEffects).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: "charged-advantage", remainingCharges: 1 }),
				expect.objectContaining({ id: "duration-advantage" }),
			]),
		);
	});
});
