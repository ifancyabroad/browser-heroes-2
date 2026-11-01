import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../schemas";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { assessEnemySkill } from "./assessment/assessEnemySkill";
import { assessEnemyWeaponAttack } from "./assessment/assessEnemyEffect";
import type { EnemyActionCandidate } from "./enemyActions";

export function getEnemyActionCandidates(
	enemy: CombatantState,
	player: CombatantState,
	excludedSkillIds: readonly SkillId[] = [],
): EnemyActionCandidate[] {
	const candidates: EnemyActionCandidate[] = [];

	for (const { skillId } of enemy.skills) {
		if (excludedSkillIds.includes(skillId)) {
			continue;
		}
		const validation = validateCombatantSkillUse(enemy, skillId);
		if (!validation.ok) {
			continue;
		}
		const category = assessEnemySkill(validation.value.effects, enemy, player, skillId);
		if (category !== null) {
			candidates.push({ action: { type: "skill", skillId }, category });
		}
	}

	// With no useful skills, selection falls back to a basic attack without consuming RNG.
	if (candidates.length > 0 && assessEnemyWeaponAttack(enemy, player) !== null) {
		// Basic attacks use their own weight category regardless of their riders.
		candidates.unshift({ action: { type: "basicAttack" }, category: "basicAttack" });
	}

	return candidates;
}
