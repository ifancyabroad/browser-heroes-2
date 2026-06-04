import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "poison",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 10,
			duration: 3,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-puizRMUbmSpZfc8i?alt=media&token=7bde7857-e17e-42fa-95cc-18460ca736ef",
	level: 2,
	maxUses: 4,
	name: "Poison Shot",
	price: 0,
	id: "poison_shot",
});
