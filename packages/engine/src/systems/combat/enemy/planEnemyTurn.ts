import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { hasActiveStatus } from "../effects/hasActiveStatus";

import { selectEnemyAction, type EnemyAction } from "./selectEnemyAction";

export function planEnemyTurn(combat: CombatState, rngState: RngState): RngResult<EnemyAction> {
	if (hasActiveStatus(combat.enemy, "stunned") || hasActiveStatus(combat.enemy, "silenced")) {
		return { value: { type: "basicAttack" }, rngState };
	}

	return selectEnemyAction({
		enemy: combat.enemy,
		player: combat.player,
		tactic: combat.enemy.tactic,
		rngState,
	});
}
