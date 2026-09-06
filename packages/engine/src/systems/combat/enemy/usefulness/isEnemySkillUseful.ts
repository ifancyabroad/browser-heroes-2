import type { Effect, SkillId } from "@app/content";

import type { CombatantState } from "../../../../schemas";

import { canUseRecovery, isEnemyEffectUseful } from "./isEnemyEffectUseful";

export function isEnemySkillUseful(
	effects: Effect[],
	enemy: CombatantState,
	player: CombatantState,
	skillId: SkillId,
): boolean {
	const recoveryIsRestricted = effects.some(isRecoveryEffect) && !canUseRecovery(enemy);

	return effects.some((effect, effectIndex) => {
		if (recoveryIsRestricted && effect.target !== "enemy") {
			return false;
		}

		return isEnemyEffectUseful({
			effect,
			source: { type: "skill", skillId },
			sourceEffectKey: `effect:${effectIndex}`,
			enemy,
			player,
		});
	});
}

function isRecoveryEffect(effect: Effect): boolean {
	return effect.type === "heal" || effect.type === "healOverTime";
}
