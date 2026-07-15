import type { Enemy } from "@app/content";
import type { CombatantState } from "../../../schemas";

import { calculateMaxHpForLevel } from "../../progression/health/calculateMaxHpForLevel";
import { calculateBaseProficiencyBonus } from "../../combat/rules/calculateBaseProficiencyBonus";
import { createCombatantId } from "../../../core/ids";
import { deriveAttributes } from "../modifiers/deriveAttributes";
import { deriveCombatStats, toCombatantCombatStats } from "../modifiers/deriveCombatStats";
import { collectFeatModifiers } from "../modifiers/collectPassiveModifiers";
import { createCombatantSkillFromEnemySkill } from "./combatantSkills";
import { applyEndlessEnemyScaling } from "./applyEndlessEnemyScaling";

export function createEnemyCombatant(
	enemy: Enemy,
	combatId: string,
	level: number,
	endlessCycle = 0,
): CombatantState {
	const featIds = [...new Set(enemy.combat.featIds)];

	const passiveModifiers = collectFeatModifiers(featIds);

	const derivedAttributes = deriveAttributes(enemy.attributes, passiveModifiers);

	const attributes = {
		strength: derivedAttributes.strength.value,
		dexterity: derivedAttributes.dexterity.value,
		constitution: derivedAttributes.constitution.value,
		intelligence: derivedAttributes.intelligence.value,
		wisdom: derivedAttributes.wisdom.value,
		charisma: derivedAttributes.charisma.value,
	};

	const derivedCombatStats = deriveCombatStats({
		baseArmourClass: enemy.combat.armourClass,
		baseProficiencyBonus: calculateBaseProficiencyBonus(level),
		baseDamageAffinities: enemy.combat.damageAffinities,
		modifiers: passiveModifiers,
	});

	const combatStats = toCombatantCombatStats(derivedCombatStats);

	const maxHp = calculateMaxHpForLevel(enemy.combat.hitDie, attributes.constitution, level);

	const combatant: CombatantState = {
		id: createCombatantId(combatId, "enemy"),
		side: "enemy",
		sourceId: enemy.id,
		name: enemy.name,
		portrait: enemy.portrait,
		level,
		maxHp,
		currentHp: maxHp,
		attributes,
		combatStats,
		savingThrowProficiencies: enemy.proficiencies.savingThrows,
		basicAttack: {
			...enemy.combat.basicAttack,
			proficient: true,
		},
		offHandBasicAttack: null,
		skills: enemy.combat.skillIds.map(createCombatantSkillFromEnemySkill),
		featIds,
		activeEffects: [],
		tactic: enemy.combat.tactic,
	};

	return applyEndlessEnemyScaling(combatant, endlessCycle);
}
