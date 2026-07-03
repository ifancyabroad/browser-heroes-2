import type { CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";

type ResolveEnemyTurnInput = {
	combat: CombatState;
	rngState: RngState;
};

export function resolveEnemyTurn(input: ResolveEnemyTurnInput): RngResult<CombatState> {
	const combat: CombatState = {
		...input.combat,
		activeActor: "enemy",
	};

	if (hasActiveStatus(combat.enemy, "stunned")) {
		return {
			value: appendCombatLog(combat, {
				turnNumber: combat.turnNumber,
				actor: "enemy",
				message: `${combat.enemy.name} is stunned and cannot act.`,
				eventType: "turn_skipped",
			}),
			rngState: input.rngState,
		};
	}

	return resolveBasicAttack({
		combat,
		attackerSide: "enemy",
		rngState: input.rngState,
	});
}
