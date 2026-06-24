import type { CombatantState } from "../../../schemas";

export const EMPTY_DAMAGE_AFFINITIES: CombatantState["damageAffinities"] = {
	resistances: [],
	immunities: [],
	vulnerabilities: [],
};

export const PLAYER_UNARMED_ATTACK: CombatantState["basicAttack"] = {
	name: "Unarmed Strike",
	attackAttribute: "strength",
	proficient: true,
	damage: {
		dice: "1d4",
		type: "crushing",
		attribute: "strength",
	},
};
