import type { EngineResult, RunState } from "../../../schemas";

import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { finishPlayerActionRound } from "./finishPlayerActionRound";

export function resolveBasicAttackRound(state: RunState): EngineResult {
	if (!state.combat) {
		throw new Error("resolveBasicAttackRound requires active combat");
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
	});
}
