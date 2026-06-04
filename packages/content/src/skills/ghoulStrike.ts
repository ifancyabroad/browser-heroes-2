import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			difficulty: 12,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgT_si0jS5qW1S5SbaJ?alt=media&token=e9f6910b-b610-407e-8484-3a2bebcc5308",
	level: 2,
	maxUses: 3,
	name: "Ghoul Strike",
	price: 0,
	id: "ghoul_strike",
});
