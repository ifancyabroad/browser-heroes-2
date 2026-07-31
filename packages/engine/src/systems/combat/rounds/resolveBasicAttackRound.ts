import { failureResult } from "../../../core/result";
import type { EngineResult, RunState } from "../../../schemas";

import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { finishPlayerActionRound } from "./finishPlayerActionRound";
import { validatePlayerAction } from "./validatePlayerAction";

export function resolveBasicAttackRound(state: RunState): EngineResult {
	if (!state.combat) {
		throw new Error("resolveBasicAttackRound requires active combat");
	}

	const validation = validatePlayerAction(state.combat);

	if (!validation.ok) {
		return failureResult(state, validation.error);
	}

	if (hasActiveStatus(state.combat.player, "stunned")) {
		return failureResult(state, "PLAYER_CANNOT_ACT");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const playerAttack = resolveBasicAttack({
		combat: state.combat,
		attackerSide: "player",
		rngState: state.rngState,
	});

	return finishPlayerActionRound({
		state,
		combatAfterPlayerAction: playerAttack.value,
		rngState: playerAttack.rngState,
		playerEffectIds,
		playerActionContext: {
			type: "basic_attack",
			targetStartedAtFullHp: state.combat.enemy.currentHp === state.combat.enemy.maxHp,
		},
	});
}
