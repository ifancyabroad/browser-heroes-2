import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAcIecu1k5j83kgrT_R?alt=media&token=a6d9fba5-4cf9-49d1-a000-b6bbb3c5b945",
	level: 3,
	maxUses: 2,
	name: "Crab Hammer",
	price: 0,
	id: "crab_hammer",
});
