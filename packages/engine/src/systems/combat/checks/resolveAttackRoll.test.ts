import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../test/createTestRunState";
import type { CombatantState } from "../../../schemas";
import { resolveAttackRoll } from "./resolveAttackRoll";

describe("resolveAttackRoll", () => {
	it("always misses on a natural one despite sufficient bonuses", () => {
		const state = createTestRunState();
		const attacker = {
			...state.combat!.player,
			combatStats: {
				...state.combat!.player.combatStats,
				attackRollBonus: 100,
			},
		};

		const result = resolveAttackRoll({
			rngState: { value: 7 },
			attacker,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
		});

		expect(result.value.roll).toMatchObject({ roll: 1, isNaturalOne: true });
		expect(result.value.hit).toBe(false);
		expect(result.value.critical).toBe(false);
	});

	it("always hits and critically strikes on a natural twenty", () => {
		const state = createTestRunState();
		const defender = {
			...state.combat!.enemy,
			combatStats: {
				...state.combat!.enemy.combatStats,
				armourClass: 1_000,
			},
		};

		const result = resolveAttackRoll({
			rngState: { value: 36 },
			attacker: state.combat!.player,
			defender,
			attribute: "strength",
			proficient: true,
		});

		expect(result.value.roll).toMatchObject({ roll: 20, isNaturalTwenty: true });
		expect(result.value.hit).toBe(true);
		expect(result.value.critical).toBe(true);
	});

	it("includes attribute, proficiency, and attack bonuses in the total", () => {
		const state = createTestRunState();
		const attacker = {
			...state.combat!.player,
			level: 5,
			attributes: {
				...state.combat!.player.attributes,
				strength: 18,
			},
			combatStats: {
				...state.combat!.player.combatStats,
				attackRollBonus: 2,
			},
		};

		const result = resolveAttackRoll({
			rngState: { value: 0 },
			attacker,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
		});

		expect(result.value.attributeModifier).toBe(4);
		expect(result.value.proficiencyBonus).toBe(3);
		expect(result.value.attackRollBonus).toBe(2);
		expect(result.value.total).toBe(result.value.roll.roll + 9);
	});

	it("applies an intrinsic attack roll mode to only that attack", () => {
		const state = createTestRunState();

		const result = resolveAttackRoll({
			rngState: { value: 0 },
			attacker: state.combat!.player,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
			rollMode: "advantage",
		});

		expect(result.value.rollMode).toBe("advantage");
		expect(result.value.rolls).toHaveLength(2);
		expect(state.combat!.player.activeEffects).toEqual([]);
	});

	it("cancels intrinsic advantage with active disadvantage", () => {
		const state = createTestRunState();
		const attacker = {
			...state.combat!.player,
			activeEffects: [
				{
					id: "test-disadvantage",
					type: "modifyRoll" as const,
					sourceCombatantId: state.combat!.enemy.id,
					source: {
						type: "skill" as const,
						skillId: "intimidating_shout" as const,
						sourceName: "Intimidating Shout",
						sourceEffectKey: "effect:0",
					},
					remainingTurns: 1,
					roll: "attack" as const,
					mode: "disadvantage" as const,
				},
			],
		};

		const result = resolveAttackRoll({
			rngState: { value: 0 },
			attacker,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
			rollMode: "advantage",
		});

		expect(result.value.rollMode).toBe("normal");
		expect(result.value.rolls).toHaveLength(1);
	});

	it("forces a charged automatic miss even on a natural twenty", () => {
		const state = createTestRunState();
		const attacker = withAutomaticAttackModifier(state.combat!.player, "automaticFailure");

		const result = resolveAttackRoll({
			rngState: { value: 36 },
			attacker,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
		});

		expect(result.value.roll.isNaturalTwenty).toBe(true);
		expect(result.value).toMatchObject({
			hit: false,
			critical: false,
			automaticOutcome: "miss",
			consumedEffectIds: ["automatic-modifier"],
		});
	});

	it("forces a charged automatic critical even on a natural one", () => {
		const state = createTestRunState();
		const attacker = withAutomaticAttackModifier(state.combat!.player, "automaticCritical");

		const result = resolveAttackRoll({
			rngState: { value: 7 },
			attacker,
			defender: state.combat!.enemy,
			attribute: "strength",
			proficient: true,
		});

		expect(result.value.roll.isNaturalOne).toBe(true);
		expect(result.value).toMatchObject({
			hit: true,
			critical: true,
			automaticOutcome: "critical",
			consumedEffectIds: ["automatic-modifier"],
		});
	});
});

function withAutomaticAttackModifier(
	combatant: CombatantState,
	mode: "automaticFailure" | "automaticCritical",
) {
	return {
		...combatant,
		activeEffects: [
			{
				id: "automatic-modifier",
				type: "modifyRoll" as const,
				sourceCombatantId: combatant.id,
				source: {
					type: "skill" as const,
					skillId: "intimidating_shout" as const,
					sourceName: "Automatic Modifier",
					sourceEffectKey: "effect:0",
				},
				remainingTurns: 4,
				remainingCharges: 1,
				roll: "attack" as const,
				mode,
			},
		],
	};
}
