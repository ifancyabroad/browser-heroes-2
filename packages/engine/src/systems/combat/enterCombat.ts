import { CombatantState, CombatState, EngineResult, RunState } from "../../schemas";

export function enterCombat(state: RunState): EngineResult {
	if (state.phase !== "town") {
		return {
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		};
	}

	const player = createPlayerCombatant(state);
	const enemy = createEnemyCombatant(state);

	const combat: CombatState = {
		id: createCombatId(state),
		encounterType: "standard",
		turnNumber: 1,
		activeActor: "player",
		player,
		enemy,
		log: [
			{
				id: createLogId(),
				turnNumber: 1,
				actor: "system",
				message: `Combat started: ${player.name} vs ${enemy.name}.`,
			},
		],
		status: "active",
	};

	const nextState: RunState = {
		...state,
		phase: "combat",
		combat,
	};

	return {
		ok: true,
		state: nextState,
		events: [
			{
				type: "COMBAT_STARTED",
				combatId: combat.id,
			},
		],
	};
}

function createPlayerCombatant(state: RunState): CombatantState {
	return {
		id: "player",
		side: "player",
		name: state.hero.name,
		level: state.hero.level,
		maxHp: state.hero.maxHp,
		currentHp: state.hero.currentHp,
		stats: state.hero.stats,
		skills: state.hero.skills,
		items: state.hero.items,
		activeEffects: [],
		isDead: false,
	};
}

function createEnemyCombatant(state: RunState): CombatantState {
	// Temporary stub.
	// Later this should use zone, battle number, boss rules, ghost chance, RNG, etc.
	return {
		id: "enemy",
		side: "enemy",
		name: `Enemy ${state.battleNumber}`,
		level: state.zoneNumber,
		maxHp: 20 + state.battleNumber * 2,
		currentHp: 20 + state.battleNumber * 2,
		stats: {
			strength: 5 + state.battleNumber,
			constitution: 3 + state.battleNumber,
			dexterity: 2 + state.battleNumber,
			intelligence: 1 + state.battleNumber,
			wisdom: 1 + state.battleNumber,
			charisma: 1 + state.battleNumber,
		},
		skills: [],
		items: [],
		activeEffects: [],
		isDead: false,
	};
}

function createCombatId(state: RunState): string {
	return `${state.id}:combat:${state.battleNumber}`;
}

function createLogId(): string {
	return crypto.randomUUID();
}
