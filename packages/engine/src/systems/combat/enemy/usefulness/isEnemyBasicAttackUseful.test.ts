import { describe, expect, it } from "vitest";

import type { CombatantState } from "../../../../schemas";
import { createTestRunState } from "../../../../test/createTestRunState";

import { isEnemyBasicAttackUseful } from "./isEnemyBasicAttackUseful";

describe("enemy basic attack usefulness", () => {
	it("keeps the action when an off-hand attack can damage an immune target", () => {
		const { enemy, player } = createCombatants();
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);
		const dualWielder = {
			...enemy,
			offHandBasicAttack: {
				...enemy.basicAttack,
				damage: { ...enemy.basicAttack.damage, type: "radiant" as const },
			},
		};

		expect(isEnemyBasicAttackUseful(dualWielder, immunePlayer)).toBe(true);
	});

	it("keeps the action when an authored rider can damage an immune target", () => {
		const { enemy, player } = createCombatants();
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);
		const riderEnemy = {
			...enemy,
			basicAttack: {
				...enemy.basicAttack,
				attackRiders: [
					{
						timing: "onHit" as const,
						effects: [
							{
								type: "damage" as const,
								target: "enemy" as const,
								damageType: "radiant" as const,
								damageClass: "magical" as const,
								dice: "1d4" as const,
								requiresAttackRoll: false,
							},
						],
					},
				],
			},
		};

		expect(isEnemyBasicAttackUseful(riderEnemy, immunePlayer)).toBe(true);
	});

	it("includes useful feat riders in the action", () => {
		const { enemy, player } = createCombatants();
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);
		const woundedEnemy = {
			...enemy,
			currentHp: 1,
			featIds: ["blood_drinker" as const],
		};

		expect(isEnemyBasicAttackUseful(woundedEnemy, immunePlayer)).toBe(true);
	});
});

function createCombatants(): { enemy: CombatantState; player: CombatantState } {
	const combat = createTestRunState().combat;

	if (!combat) {
		throw new Error("Expected test combat");
	}

	return { enemy: combat.enemy, player: combat.player };
}

function withImmunity(
	combatant: CombatantState,
	damageType: CombatantState["basicAttack"]["damage"]["type"],
): CombatantState {
	return {
		...combatant,
		combatStats: {
			...combatant.combatStats,
			damageAffinities: {
				...combatant.combatStats.damageAffinities,
				immunities: [...combatant.combatStats.damageAffinities.immunities, damageType],
			},
		},
	};
}
