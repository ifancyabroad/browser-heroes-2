import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Sneak behind the enemy to strike them in the back.",
	effects: [
		{
			multiplier: 2,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqa_ZuZcAZCuzTr5c3?alt=media&token=e7f6ca07-6427-467d-9aef-21315491dd76",
	level: 2,
	maxUses: 1,
	name: "Backstab",
	price: 350,
	id: "backstab",
});
