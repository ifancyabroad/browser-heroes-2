import type { EngineResult, RunState } from "../../../schemas";

import { failureResult, successResult } from "../../../core/result";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { advanceTurn } from "./advanceTurn";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { advanceCombatantEffects } from "../effects/advanceCombatantEffects";
import { resolveEnemyTurn } from "../enemy/resolveEnemyTurn";

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

	const playerEffects = advanceCombatantEffects({
		combat: playerAttack.value,
		combatantSide: "player",
		effectIds: playerEffectIds,
		rngState: playerAttack.rngState,
	});

	const afterPlayerDeathCheck = resolveCombatStatus(playerEffects.value);

	if (afterPlayerDeathCheck.status === "player_won") {
		const completedState: RunState = {
			...state,
			rngState: playerEffects.rngState,
			combat: afterPlayerDeathCheck,
		};

		const victoryResult = applyVictoryReward(completedState);

		if (!victoryResult) {
			return failureResult(completedState, "ENEMY_DEFINITION_NOT_FOUND");
		}

		return successResult(victoryResult.state, [
			{
				type: "COMBAT_ENDED",
				outcome: "victory",
				reward: victoryResult.reward,
			},
		]);
	}

	const enemyEffectIds = getActiveEffectIds(afterPlayerDeathCheck.enemy);

	const enemyTurn = resolveEnemyTurn({
		combat: afterPlayerDeathCheck,
		rngState: playerAttack.rngState,
	});

	const enemyEffects = advanceCombatantEffects({
		combat: enemyTurn.value,
		combatantSide: "enemy",
		effectIds: enemyEffectIds,
		rngState: enemyTurn.rngState,
	});

	const afterEnemyDeathCheck = resolveCombatStatus(enemyEffects.value);

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return successResult(
			{
				...state,
				rngState: enemyEffects.rngState,
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
			rngState: enemyEffects.rngState,
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
