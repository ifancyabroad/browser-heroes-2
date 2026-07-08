import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "backstab",
	name: "Backstab",
	description: "Sneak behind the enemy to strike them in the back.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqa_ZuZcAZCuzTr5c3?alt=media&token=e7f6ca07-6427-467d-9aef-21315491dd76",
	pool: "assassin",
	category: "attack",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [],
		},
	],
	tags: [],
});
