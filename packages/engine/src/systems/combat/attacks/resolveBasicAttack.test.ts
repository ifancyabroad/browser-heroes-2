import { describe, expect, it } from "vitest";

import { createUnprotectedTestRunState } from "../../../test/createTestRunState";
import { resolveBasicAttack } from "./resolveBasicAttack";

describe("resolveBasicAttack charged roll modifiers", () => {
	it("consumes an automatic miss during a basic attack", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		combat.player.activeEffects.push({
			id: "automatic-miss",
			type: "modifyRoll",
			sourceCombatantId: combat.enemy.id,
			sourceSide: "enemy",
			source: {
				type: "skill",
				skillId: "cruel_deception",
				sourceName: "Cruel Deception",
				sourceEffectKey: "effect:0",
			},
			duration: { unit: "turns", remaining: 4 },
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
		expect(result.value.log.at(-1)?.outcome).toEqual({
			type: "miss",
			targetId: combat.enemy.id,
		});
	});

	it("records structured damage for a successful attack", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);

		const result = resolveBasicAttack({
			combat,
			attackerSide: "player",
			rngState: { value: 0 },
		});

		const damageEntry = result.value.log.find((entry) => entry.eventType === "damage_dealt");
		expect(damageEntry?.outcome).toEqual(
			expect.objectContaining({
				type: "damage",
				targetId: combat.enemy.id,
				hpDamage: expect.any(Number),
				absorbedDamage: 0,
			}),
		);
	});

	it("decrements charged advantage without removing duration-based modifiers", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		combat.player.activeEffects.push(
			{
				id: "charged-advantage",
				type: "modifyRoll",
				sourceCombatantId: combat.player.id,
				sourceSide: "player",
				source: {
					type: "skill",
					skillId: "focus_energy",
					sourceName: "Focus Energy",
					sourceEffectKey: "effect:0",
				},
				duration: { unit: "turns", remaining: 4 },
				remainingCharges: 2,
				roll: "attack",
				mode: "advantage",
			},
			{
				id: "duration-advantage",
				type: "modifyRoll",
				sourceCombatantId: combat.player.id,
				sourceSide: "player",
				source: {
					type: "skill",
					skillId: "dancing_defense",
					sourceName: "Dancing Defense",
					sourceEffectKey: "effect:0",
				},
				duration: { unit: "turns", remaining: 4 },
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
