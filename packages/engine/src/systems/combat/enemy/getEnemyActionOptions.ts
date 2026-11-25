import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../schemas";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { assessEnemySkill } from "./assessment/assessEnemySkill";
import { assessEnemyWeaponAttack } from "./assessment/assessEnemyEffect";
import type { EnemyActionCandidate, EnemyActionOptions } from "./enemyActions";
import { canTargetCombatant } from "../combatants/canTargetCombatant";

export function getEnemyActionOptions(
	enemy: CombatantState,
	player: CombatantState,
	excludedSkillIds: readonly SkillId[] = [],
): EnemyActionOptions {
	const candidates: EnemyActionCandidate[] = [];

	for (const { skillId } of enemy.skills) {
		if (excludedSkillIds.includes(skillId)) {
			continue;
		}
		const validation = validateCombatantSkillUse(enemy, skillId, player);
		if (!validation.ok) {
			continue;
		}
		const category = assessEnemySkill(validation.value.effects, enemy, player, skillId);
		if (category !== null) {
			candidates.push({ action: { type: "skill", skillId }, category });
		}
	}

	const canAttack = canTargetCombatant(enemy, player);
	if (candidates.length === 0) {
		return { type: "fallback", action: canAttack ? { type: "basicAttack" } : { type: "skip" } };
	}

	if (canAttack && assessEnemyWeaponAttack(enemy, player) !== null) {
		// Basic attacks use their own weight category regardless of their riders.
		candidates.unshift({ action: { type: "basicAttack" }, category: "basicAttack" });
	}

	return { type: "choices", candidates };
}
