import type { CombatState, EngineAction, EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { resolveCombatStatus } from "./death";
import { resolveBasicAttack } from "./attacks";

export function applyCombatAction(state: RunState, action: EngineAction): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	if (state.combat.status !== "active") {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	switch (action.type) {
		case "PLAYER_BASIC_ATTACK":
			return resolveBasicAttackRound(state);

		default:
			return failureResult(state, "INVALID_ACTION");
	}
}

function resolveBasicAttackRound(state: RunState): EngineResult {
	const combat = state.combat!;
	const playerAttack = resolveBasicAttack({
		combat,
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

function advanceTurn(combat: CombatState): CombatState {
	return {
		...combat,
		turnNumber: combat.turnNumber + 1,
		activeActor: "player",
	};
}
