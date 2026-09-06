import type { SkillId } from "@app/content";

import type { CombatantState } from "../../../schemas";

import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { isEnemySkillUseful } from "./usefulness/isEnemySkillUseful";

export function getUsefulEnemySkillIds(enemy: CombatantState, player: CombatantState): SkillId[] {
	return enemy.skills
		.filter((skillState) => {
			const validation = validateCombatantSkillUse(enemy, skillState.skillId);

			return (
				validation.ok &&
				isEnemySkillUseful(validation.value.effects, enemy, player, skillState.skillId)
			);
		})
		.map((skillState) => skillState.skillId);
}
