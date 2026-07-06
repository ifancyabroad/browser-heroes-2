import type { EngineResult, PlayerSkipTurnAction, RunState } from "../../../schemas";

import { hasActiveStatus } from "../effects/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { finishPlayerActionRound } from "./finishPlayerActionRound";

export function resolveSkippedPlayerRound(
	state: RunState,
	_action: PlayerSkipTurnAction,
): EngineResult {
	if (!state.combat) {
		throw new Error("resolveSkippedPlayerRound requires active combat");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const message = hasActiveStatus(state.combat.player, "stunned")
		? `${state.combat.player.name} is stunned and cannot act.`
		: `${state.combat.player.name} skips their turn.`;

	const combatAfterPlayerSkip = appendCombatLog(state.combat, {
		turnNumber: state.combat.turnNumber,
		actor: "player",
		message,
		eventType: "turn_skipped",
	});

	return finishPlayerActionRound({
		state,
		combatAfterPlayerAction: combatAfterPlayerSkip,
		rngState: state.rngState,
		playerEffectIds,
	});
}
