import type { CombatState } from "../../../schemas";

export function isCombatVictory(combat: CombatState): boolean {
	return combat.status === "player_won";
}

export function isCombatDefeat(combat: CombatState): boolean {
	return combat.status === "enemy_won";
}

export function isCombatComplete(combat: CombatState): boolean {
	return isCombatVictory(combat) || isCombatDefeat(combat);
}
