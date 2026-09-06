import { describe, expect, it } from "vitest";

import { createTestRunState, modifyTestRunState } from "../../../test/createTestRunState";

import { planEnemyTurn } from "./planEnemyTurn";
import { resolveEnemyTurn } from "./resolveEnemyTurn";

describe("enemy turn planning", () => {
	it("does not reconsider healing after taking damage during the round", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			const enemy = draft.combat!.enemy;
			enemy.currentHp = enemy.maxHp;
			enemy.skills = [{ skillId: "cure_minor_wounds", chargesRemaining: 2 }];
			enemy.tactic = "caster";
		});
		const combatAtRoundStart = state.combat!;
		const plan = planEnemyTurn(combatAtRoundStart, state.rngState);
		const combatAfterPlayerDamage = {
			...combatAtRoundStart,
			enemy: { ...combatAtRoundStart.enemy, currentHp: 1 },
		};

		expect(plan.value).toEqual({ type: "basicAttack" });

		const result = resolveEnemyTurn({
			combat: combatAfterPlayerDamage,
			rngState: plan.rngState,
			plannedAction: plan.value,
		});

		expect(result.value.enemy.skills).toEqual([
			{ skillId: "cure_minor_wounds", chargesRemaining: 2 },
		]);
		expect(result.value.log).not.toEqual(
			expect.arrayContaining([expect.objectContaining({ eventType: "healing_done" })]),
		);
	});

	it("still prevents a planned action when the enemy is stunned during the round", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			const enemy = draft.combat!.enemy;
			enemy.currentHp = Math.floor(enemy.maxHp / 2);
			enemy.skills = [{ skillId: "thou_hast_bested_me", chargesRemaining: 1 }];
			enemy.tactic = "conceder";
		});
		const combatAtRoundStart = state.combat!;
		const plan = planEnemyTurn(combatAtRoundStart, state.rngState);
		const combatAfterPlayerStun = {
			...combatAtRoundStart,
			enemy: {
				...combatAtRoundStart.enemy,
				activeEffects: [
					...combatAtRoundStart.enemy.activeEffects,
					{
						id: "mid-round-stun",
						type: "status" as const,
						sourceCombatantId: combatAtRoundStart.player.id,
						sourceSide: "player" as const,
						source: {
							type: "skill" as const,
							skillId: "power_word_stun" as const,
							sourceName: "Power Word Stun",
							sourceEffectKey: "effect:0",
						},
						duration: { unit: "turns" as const, remaining: 1 },
						statusId: "stunned" as const,
					},
				],
			},
		};

		expect(plan.value).toEqual({ type: "skill", skillId: "thou_hast_bested_me" });

		const result = resolveEnemyTurn({
			combat: combatAfterPlayerStun,
			rngState: plan.rngState,
			plannedAction: plan.value,
		});

		expect(result.value.enemy.skills).toEqual([
			{ skillId: "thou_hast_bested_me", chargesRemaining: 1 },
		]);
		expect(result.value.log).toEqual(
			expect.arrayContaining([expect.objectContaining({ eventType: "turn_skipped" })]),
		);
	});
});
