import type { Enemy } from "@app/content";
import type { CombatantState } from "../../../schemas";

import { getMaximumDiceValue } from "../../../core/dice";
import { createCombatantId } from "../../../core/ids";
import { applyAttributeModifiers } from "../modifiers/applyAttributeModifiers";
import { buildCombatStats } from "../modifiers/buildCombatStats";
import { collectPassiveModifiers } from "../modifiers/collectPassiveModifiers";
import { createCombatantSkillFromEnemySkill } from "./combatantSkills";

export function createEnemyCombatant(enemy: Enemy, combatId: string): CombatantState {
	const featIds = [...new Set(enemy.combat.featIds)];

	const passiveModifiers = collectPassiveModifiers([], featIds);

	const attributes = applyAttributeModifiers(enemy.attributes, passiveModifiers);

	const combatStats = buildCombatStats({
		baseArmourClass: enemy.combat.armourClass,
		baseProficiencyBonus: enemy.combat.proficiencyBonus,
		baseDamageAffinities: enemy.combat.damageAffinities,
		passiveModifiers,
	});

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
		combatStats,
		savingThrowProficiencies: enemy.proficiencies.savingThrows,
		basicAttack: {
			...enemy.combat.basicAttack,
			proficient: true,
		},
		skills: enemy.combat.skills.map(createCombatantSkillFromEnemySkill),
		featIds,
		activeEffects: [],
	};
}
