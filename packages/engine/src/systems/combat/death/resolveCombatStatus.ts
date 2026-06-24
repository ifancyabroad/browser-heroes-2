import type { CombatState } from "../../../schemas";

export function resolveCombatStatus(combat: CombatState): CombatState {
	if (combat.player.currentHp <= 0) {
		return {
			...combat,
			status: "enemy_won",
		};
	}

	if (combat.enemy.currentHp <= 0) {
		return {
			...combat,
			status: "player_won",
		};
	}

	return {
		...combat,
		status: "active",
	};
}
