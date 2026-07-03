import type { EngineResult, PlayerSkipTurnAction, RunState } from "../../../schemas";

import { successResult } from "../../../core/result";

import { hasActiveStatus } from "../effects/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { resolveEnemyTurn } from "../enemy/resolveEnemyTurn";
import { advanceTurn } from "./advanceTurn";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { advanceCombatantEffects } from "../effects/advanceCombatantEffects";

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

	const combatAfterPlayerEffects = advanceCombatantEffects({
		combat: combatAfterPlayerSkip,
		combatantSide: "player",
		effectIds: playerEffectIds,
	});

	const enemyEffectIds = getActiveEffectIds(combatAfterPlayerEffects.enemy);

	const enemyTurn = resolveEnemyTurn({
		combat: combatAfterPlayerSkip,
		rngState: state.rngState,
	});

	const combatAfterEnemyEffects = advanceCombatantEffects({
		combat: enemyTurn.value,
		combatantSide: "enemy",
		effectIds: enemyEffectIds,
	});

	const afterEnemyDeathCheck = resolveCombatStatus(combatAfterEnemyEffects);

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return successResult(
			{
				...state,
				rngState: enemyTurn.rngState,
				phase: "dead",
				combat: afterEnemyDeathCheck,
			},
			[
				{
					type: "COMBAT_ENDED",
					outcome: "defeat",
				},
			],
		);
	}

	return successResult(
		{
			...state,
			rngState: enemyTurn.rngState,
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
