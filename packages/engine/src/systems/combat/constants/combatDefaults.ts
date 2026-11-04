import type { CombatantState } from "../../../schemas";

export const BASE_HERO_INITIATIVE = 10;

export const EMPTY_DAMAGE_AFFINITIES: CombatantState["combatStats"]["damageAffinities"] = {
	resistances: [],
	immunities: [],
	vulnerabilities: [],
};

export const PLAYER_UNARMED_ATTACK: CombatantState["basicAttack"] = {
	name: "Unarmed Strike",
	icon: "skills/common/punch.png",
	attackRange: "melee",
	attackAttribute: "strength",
	proficient: true,
	damage: {
		dice: "1d4",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	attackRiders: [],
};
