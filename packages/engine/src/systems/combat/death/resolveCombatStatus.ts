import type { CombatState } from "../../../schemas";

import { appendCombatLog } from "../logs/appendCombatLog";

export function resolveCombatStatus(combat: CombatState): CombatState {
	if (combat.player.currentHp <= 0) {
		return appendCombatLog(
			{
				...combat,
				status: "enemy_won",
			},
			{
				turnNumber: combat.turnNumber,
				actor: "enemy",
				message: `${combat.player.name} is slain.`,
				eventType: "combatant_slain",
			},
		);
	}

	if (combat.enemy.currentHp <= 0) {
		return appendCombatLog(
			{
				...combat,
				status: "player_won",
			},
			{
				turnNumber: combat.turnNumber,
				actor: "player",
				message: `${combat.enemy.name} is slain.`,
				eventType: "combatant_slain",
			},
		);
	}

	return {
		...combat,
		status: "active",
	};
}
