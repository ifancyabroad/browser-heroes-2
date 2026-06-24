import { type Enemy } from "@app/content";

import type { CombatantState } from "../../../schemas";

import { getMaximumDiceValue } from "../../../core/dice";
import { createCombatantId } from "../../../core/ids";
import { applyAttributeModifiers } from "../modifiers/applyAttributeModifiers";
import { applyPassiveDamageAffinities } from "../modifiers/applyDamageAffinityModifiers";
import { applyPassiveStatModifiers } from "../modifiers/applyStatModifiers";
import { collectPassiveModifiers } from "../modifiers/collectPassiveModifiers";
import { createCombatantSkillFromEnemySkill } from "./combatantSkills";

export function createEnemyCombatant(enemy: Enemy, combatId: string): CombatantState {
	const featIds = [...new Set(enemy.combat.featIds)];

	const passiveModifiers = collectPassiveModifiers([], featIds);

	const attributes = applyAttributeModifiers(enemy.attributes, passiveModifiers);

	const maxHp = getMaximumDiceValue(enemy.combat.hitDice);

	return {
		id: createCombatantId(combatId, "enemy"),
		side: "enemy",
		sourceId: enemy.id,
		name: enemy.name,
		level: enemy.level,
		maxHp,
		currentHp: maxHp,
		attributes,
		armourClass: Math.max(
			0,
			Math.floor(
				applyPassiveStatModifiers(
					"armourClass",
					enemy.combat.armourClass,
					passiveModifiers,
				),
			),
		),
		proficiencyBonus: Math.max(
			0,
			Math.floor(
				applyPassiveStatModifiers(
					"proficiencyBonus",
					enemy.combat.proficiencyBonus,
					passiveModifiers,
				),
			),
		),
		savingThrowProficiencies: enemy.proficiencies.savingThrows,
		damageAffinities: applyPassiveDamageAffinities(
			enemy.combat.damageAffinities,
			passiveModifiers,
		),
		basicAttack: {
			...enemy.combat.basicAttack,
			proficient: true,
		},
		skills: enemy.combat.skills.map(createCombatantSkillFromEnemySkill),
		featIds,
		activeEffects: [],
	};
}
