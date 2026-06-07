import type { CombatState, RunState } from "../schemas";

export type CombatView = {
	combat: CombatState;
	canAct: boolean;
};

export function selectCombatView(state: RunState): CombatView | null {
	if (state.phase !== "combat" || !state.combat) {
		return null;
	}

	return {
		combat: state.combat,
		canAct: state.combat.status === "active",
	};
}
