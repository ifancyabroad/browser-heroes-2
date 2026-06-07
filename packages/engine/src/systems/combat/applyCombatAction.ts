import type { CombatState, EngineAction, EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { applyDamage, calculateDamage } from "./damage";
import { appendCombatLog } from "./combatLog";
import { resolveCombatStatus } from "./death";

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

	const afterPlayerAttack = resolveAttack(combat, "player");

	const afterPlayerDeathCheck = resolveCombatStatus(afterPlayerAttack);

	if (afterPlayerDeathCheck.status === "enemy_dead") {
		return successResult(
			{
				...state,
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

	const afterEnemyAttack = resolveAttack(afterPlayerDeathCheck, "enemy");

	const afterEnemyDeathCheck = resolveCombatStatus(afterEnemyAttack);

	if (afterEnemyDeathCheck.status === "player_dead") {
		return successResult(
			{
				...state,
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
			combat: {
				...afterEnemyDeathCheck,
				turnNumber: afterEnemyDeathCheck.turnNumber + 1,
				activeActor: "player",
			},
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}

function resolveAttack(combat: CombatState, attackerSide: "player" | "enemy"): CombatState {
	const attacker = attackerSide === "player" ? combat.player : combat.enemy;

	const defender = attackerSide === "player" ? combat.enemy : combat.player;

	const damage = calculateDamage({
		attacker,
		defender,
	});

	const updatedDefender = applyDamage(defender, damage);

	const nextCombat: CombatState = {
		...combat,
		player: updatedDefender.side === "player" ? updatedDefender : combat.player,
		enemy: updatedDefender.side === "enemy" ? updatedDefender : combat.enemy,
	};

	return appendCombatLog(nextCombat, {
		turnNumber: combat.turnNumber,
		actor: attacker.side,
		message: `${attacker.name} attacks ${defender.name} for ${damage.amount} damage.`,
		eventType: "basic_attack",
	});
}
