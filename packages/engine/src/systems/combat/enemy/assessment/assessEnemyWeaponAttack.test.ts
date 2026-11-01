import { describe, expect, it } from "vitest";

import type { CombatantState } from "../../../../schemas";
import { createTestCombat } from "../../../../test/createTestCombat";

import { assessEnemyWeaponAttack } from "./assessEnemyEffect";
import { assessEnemySkill } from "./assessEnemySkill";

describe("enemy weapon attack usefulness", () => {
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

		expect(assessEnemyWeaponAttack(dualWielder, immunePlayer)).not.toBeNull();
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

		expect(assessEnemyWeaponAttack(riderEnemy, immunePlayer)).not.toBeNull();
	});

	it("includes useful feat riders in the action", () => {
		const { enemy, player } = createCombatants();
		const immunePlayer = withImmunity(player, enemy.basicAttack.damage.type);
		const woundedEnemy = {
			...enemy,
			currentHp: 1,
			featIds: ["blood_drinker" as const],
		};

		expect(assessEnemyWeaponAttack(woundedEnemy, immunePlayer)).not.toBeNull();
		expect(
			assessEnemySkill(
				[{ type: "attackDamage", target: "enemy", multiplier: 1, attackRiders: [] }],
				woundedEnemy,
				immunePlayer,
				"shadow_strike",
			),
		).not.toBeNull();
	});
});

function createCombatants() {
	return createTestCombat();
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
