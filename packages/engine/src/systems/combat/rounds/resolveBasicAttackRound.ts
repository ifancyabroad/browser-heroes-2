import type { EngineResult, RunState } from "../../../schemas";

import { failureResult, successResult } from "../../../core/result";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { advanceTurn } from "./advanceTurn";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";

export function resolveBasicAttackRound(state: RunState): EngineResult {
	if (!state.combat) {
		throw new Error("resolveBasicAttackRound requires active combat");
	}

	const playerAttack = resolveBasicAttack({
		combat: state.combat,
		attackerSide: "player",
		rngState: state.rngState,
	});

	const afterPlayerDeathCheck = resolveCombatStatus(playerAttack.value);

	if (afterPlayerDeathCheck.status === "player_won") {
		const completedState: RunState = {
			...state,
			rngState: playerAttack.rngState,
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

	const enemyAttack = resolveBasicAttack({
		combat: {
			...afterPlayerDeathCheck,
			activeActor: "enemy",
		},
		attackerSide: "enemy",
		rngState: playerAttack.rngState,
	});

	const afterEnemyDeathCheck = resolveCombatStatus(enemyAttack.value);

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return successResult(
			{
				...state,
				rngState: enemyAttack.rngState,
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
			rngState: enemyAttack.rngState,
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
