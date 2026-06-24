import type { EngineResult, RunState } from "../../../schemas";

import { successResult } from "../../../core/result";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { advanceTurn } from "./advanceTurn";

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
		return successResult(
			{
				...state,
				rngState: playerAttack.rngState,
				combat: afterPlayerDeathCheck,
			},
			[
				{
					type: "COMBAT_ENDED",
					outcome: "victory",
				},
			],
		);
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
