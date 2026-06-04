import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "Infuse your attack with searing flames to scorch your target.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "fire",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt0W8prsXi7-54nBVz?alt=media&token=20861d4d-7243-4d77-84b4-9d5a0a5f986a",
	level: 3,
	maxUses: 7,
	name: "Fire Strike",
	price: 160,
	target: "enemy",
	id: "fire_strike",
});
