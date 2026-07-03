import type { CombatantSide, CombatantState, CombatState } from "../../../schemas";

export function getCombatant(combat: CombatState, side: CombatantSide): CombatantState {
	return side === "player" ? combat.player : combat.enemy;
}

export function getOpponent(combat: CombatState, side: CombatantSide): CombatantState {
	return side === "player" ? combat.enemy : combat.player;
}

export function replaceCombatant(combat: CombatState, combatant: CombatantState): CombatState {
	return {
		...combat,
		[combatant.side]: combatant,
	};
}

export function getCombatantById(combat: CombatState, combatantId: string): CombatantState {
	if (combat.player.id === combatantId) {
		return combat.player;
	}

	if (combat.enemy.id === combatantId) {
		return combat.enemy;
	}

	throw new Error(`Combatant ${combatantId} does not exist in combat ${combat.id}`);
}
