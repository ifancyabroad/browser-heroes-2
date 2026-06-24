import type { CombatState } from "../../../schemas";

export function advanceTurn(combat: CombatState): CombatState {
	return {
		...combat,
		turnNumber: combat.turnNumber + 1,
		activeActor: "player",
	};
}
