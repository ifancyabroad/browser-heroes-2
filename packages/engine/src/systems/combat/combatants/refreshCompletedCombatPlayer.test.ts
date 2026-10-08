import { describe, expect, it } from "vitest";
import { applyAction } from "../../../actions";
import { createTestVictoryState } from "../../../test/createTestRunState";
import { createPlayerCombatant } from "./createPlayerCombatant";
import { replaceCombatantActiveEffects } from "../effects/replaceCombatantActiveEffects";

describe("completed combat player refresh", () => {
	it.each([
		{ choice: "level" as const, hpBonus: -30 },
		{ choice: "level" as const, hpBonus: 5 },
		{ choice: "reward" as const, hpBonus: -30 },
		{ choice: "reward" as const, hpBonus: 5 },
	])(
		"preserves a $hpBonus HP effect through a $choice choice and the next battle",
		({ choice, hpBonus }) => {
			const state = createTestVictoryState();
			state.hero.maxHp = 100;
			state.hero.currentHp = 80;
			const combat = state.combat!;
			combat.player = replaceCombatantActiveEffects(
				createPlayerCombatant(state.hero, combat.id),
				[
					{
						id: "persistent-hp-effect",
						type: "modifyStat",
						sourceCombatantId: combat.enemy.id,
						sourceSide: "enemy",
						source: {
							type: "skill",
							skillId: "doom_song",
							sourceName: "Doom Song",
							sourceEffectKey: "effect:0",
						},
						duration: { unit: "battles", remaining: 2 },
						stat: "maxHpBonus",
						value: hpBonus,
					},
				],
			);
			if (choice === "level") {
				state.hero.pendingLevelUp = { level: 2, hpGain: 9, rerollIndex: 0, options: [] };
			} else {
				state.pendingRewardChoice = {
					options: [
						{
							type: "item",
							item: { instanceId: "reward", type: "static", itemId: "power_chain" },
						},
						{ type: "gold", amount: 10 },
						{ type: "gold", amount: 20 },
					],
				};
			}
			const original = structuredClone(state);
			const result = applyAction(
				state,
				choice === "level"
					? { type: "COMPLETE_LEVEL_UP", selection: null }
					: { type: "SELECT_REWARD", selection: { optionIndex: 0 } },
			);

			expect(result.ok).toBe(true);
			expect(state).toEqual(original);
			const basePlayer = createPlayerCombatant(result.state.hero, combat.id);
			expect(basePlayer.maxHp).toBeGreaterThan(100);
			expect(result.state.combat!.player.activeEffects).toEqual(combat.player.activeEffects);
			expect(result.state.combat!.player.maxHp).toBe(basePlayer.maxHp + hpBonus);
			expect(result.state.combat!.player.currentHp).toBe(basePlayer.currentHp + hpBonus);

			const continued = applyAction(result.state, { type: "CONTINUE_TO_NEXT_COMBAT" });
			expect(continued.ok).toBe(true);
			expect(continued.state.combat!.player.activeEffects).toEqual([
				{ ...combat.player.activeEffects[0], duration: { unit: "battles", remaining: 1 } },
			]);
			expect(continued.state.combat!.player.maxHp).toBe(basePlayer.maxHp + hpBonus);
			expect(continued.state.combat!.player.currentHp).toBe(basePlayer.currentHp + hpBonus);

			const nextVictory = structuredClone(continued.state);
			nextVictory.combat!.status = "player_won";
			nextVictory.combat!.enemy.currentHp = 0;
			const expired = applyAction(nextVictory, { type: "CONTINUE_TO_NEXT_COMBAT" });
			expect(expired.ok).toBe(true);
			expect(expired.state.combat!.player.activeEffects).toEqual([]);
			expect(expired.state.combat!.player.maxHp).toBe(basePlayer.maxHp);
			expect(expired.state.combat!.player.currentHp).toBe(basePlayer.currentHp);
		},
	);
});
