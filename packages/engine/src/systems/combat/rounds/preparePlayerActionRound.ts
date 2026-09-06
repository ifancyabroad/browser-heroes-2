import type { CombatState } from "../../../schemas";
import type { RngState } from "../../../core/rng";

import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { planEnemyTurn } from "../enemy/planEnemyTurn";

export function preparePlayerActionRound(combat: CombatState, rngState: RngState) {
	const enemyTurnPlan = planEnemyTurn(combat, rngState);

	return {
		playerEffectIds: getActiveEffectIds(combat.player),
		plannedEnemyAction: enemyTurnPlan.value,
		rngState: enemyTurnPlan.rngState,
	};
}
