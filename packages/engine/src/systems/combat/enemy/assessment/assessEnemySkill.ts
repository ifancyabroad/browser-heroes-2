import type { Effect, SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import { getPreferredSkillCategory, type EnemySkillCategory } from "../enemyActions";
import { assessEnemyEffect, canUseRecovery } from "./assessEnemyEffect";

export function assessEnemySkill(
	effects: Effect[],
	enemy: CombatantState,
	player: CombatantState,
	skillId: SkillId,
): EnemySkillCategory | null {
	const hasRecovery = effects.some(
		(effect) => effect.type === "heal" || effect.type === "healOverTime",
	);
	const recoveryIsRestricted = hasRecovery && !canUseRecovery(enemy);

	return getPreferredSkillCategory(
		effects.map((effect, effectIndex) => {
			// Above half health, recovery skills need a useful enemy-targeting effect.
			if (recoveryIsRestricted && effect.target !== "enemy") {
				return null;
			}
			return assessEnemyEffect({
				effect,
				source: { type: "skill", skillId },
				sourceEffectKey: `effect:${effectIndex}`,
				enemy,
				player,
			});
		}),
	);
}
