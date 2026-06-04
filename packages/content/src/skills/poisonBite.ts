import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 17,
			duration: 4,
			effect: "poison",
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTOJ5N4B3V55HpTl-8?alt=media&token=9e866550-b99b-4c0f-b146-d98d34634113",
	level: 1,
	maxUses: 4,
	name: "Poison Bite",
	price: 0,
	id: "poison_bite",
});
