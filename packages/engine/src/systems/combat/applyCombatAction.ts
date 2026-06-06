import { CombatantState, CombatState, EngineAction, EngineResult, RunState } from "../../schemas";

export function applyCombatAction(state: RunState, action: EngineAction): EngineResult {
	if (state.phase !== "combat" || !state.combat) {
		return {
			ok: false,
			state,
			events: [],
			error: "COMBAT_NOT_ACTIVE",
		};
	}

	if (state.combat.status !== "active") {
		return {
			ok: false,
			state,
			events: [],
			error: "COMBAT_NOT_ACTIVE",
		};
	}

	switch (action.type) {
		case "PLAYER_BASIC_ATTACK":
			return resolveBasicAttackRound(state);

		default:
			return {
				ok: false,
				state,
				events: [],
				error: "INVALID_ACTION",
			};
	}
}

function resolveBasicAttackRound(state: RunState): EngineResult {
	const combat = state.combat!;

	const afterPlayerAttack = resolveAttack({
		combat,
		attacker: combat.player,
		defender: combat.enemy,
	});

	if (afterPlayerAttack.enemy.isDead) {
		return finishCombatWithVictory(state, afterPlayerAttack);
	}

	const afterEnemyAttack = resolveAttack({
		combat: afterPlayerAttack,
		attacker: afterPlayerAttack.enemy,
		defender: afterPlayerAttack.player,
	});

	if (afterEnemyAttack.player.isDead) {
		return finishCombatWithDefeat(state, afterEnemyAttack);
	}

	const nextCombat: CombatState = {
		...afterEnemyAttack,
		turnNumber: afterEnemyAttack.turnNumber + 1,
		activeActor: "player",
	};

	return {
		ok: true,
		state: {
			...state,
			combat: nextCombat,
		},
		events: [{ type: "COMBAT_TURN_RESOLVED" }],
	};
}

function resolveAttack(input: {
	combat: CombatState;
	attacker: CombatantState;
	defender: CombatantState;
}): CombatState {
	const { combat, attacker, defender } = input;

	const damage = calculateDamage(attacker, defender);

	const updatedDefender: CombatantState = {
		...defender,
		currentHp: Math.max(0, defender.currentHp - damage),
		isDead: defender.currentHp - damage <= 0,
	};

	const message = `${attacker.name} attacks ${defender.name} for ${damage} damage.`;

	const nextCombat: CombatState = {
		...combat,
		player: updatedDefender.id === "player" ? updatedDefender : combat.player,
		enemy: updatedDefender.id === "enemy" ? updatedDefender : combat.enemy,
		log: [
			...combat.log,
			{
				id: `${combat.id}:log:${combat.log.length + 1}`,
				turnNumber: combat.turnNumber,
				actor: attacker.side,
				message,
			},
		],
	};

	return nextCombat;
}

function calculateDamage(attacker: CombatantState, defender: CombatantState): number {
	// Temporary simple formula.
	// Later this becomes systems/combat/damage.ts.
	return Math.max(1, attacker.stats.strength - defender.stats.constitution);
}

function finishCombatWithVictory(state: RunState, combat: CombatState): EngineResult {
	const nextCombat: CombatState = {
		...combat,
		status: "enemy_dead",
		log: [
			...combat.log,
			{
				id: `${combat.id}:log:${combat.log.length + 1}`,
				turnNumber: combat.turnNumber,
				actor: "system",
				message: `${combat.enemy.name} was defeated.`,
			},
		],
	};

	return {
		ok: true,
		state: {
			...state,
			combat: nextCombat,
			phase: "combat",
			gold: state.gold + 10 * state.goldMultiplier,
		},
		events: [{ type: "COMBAT_ENDED", outcome: "victory" }],
	};
}

function finishCombatWithDefeat(state: RunState, combat: CombatState): EngineResult {
	const nextCombat: CombatState = {
		...combat,
		status: "player_dead",
		log: [
			...combat.log,
			{
				id: `${combat.id}:log:${combat.log.length + 1}`,
				turnNumber: combat.turnNumber,
				actor: "system",
				message: `${combat.player.name} was defeated.`,
			},
		],
	};

	return {
		ok: true,
		state: {
			...state,
			phase: "dead",
			combat: nextCombat,
		},
		events: [{ type: "COMBAT_ENDED", outcome: "defeat" }],
	};
}
