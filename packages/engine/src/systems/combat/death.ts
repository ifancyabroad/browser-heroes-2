import type { CombatState } from "../../schemas";

export function resolveCombatStatus(combat: CombatState): CombatState {
	if (combat.player.isDead) {
		return {
			...combat,
			status: "player_dead",
		};
	}

	if (combat.enemy.isDead) {
		return {
			...combat,
			status: "enemy_dead",
		};
	}

	return {
		...combat,
		status: "active",
	};
}

export function isCombatVictory(combat: CombatState): boolean {
	return combat.status === "enemy_dead";
}

export function isCombatDefeat(combat: CombatState): boolean {
	return combat.status === "player_dead";
}
