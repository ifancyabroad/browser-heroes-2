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
			damageType: "cold",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 2,
			modifier: "constitution",
			properties: [
				{
					name: "dexterity",
					type: "stat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJp6wp3bVLggUSeffg?alt=media&token=ce450c96-e4f7-4181-bf0f-62c1eb67d2be",
	level: 4,
	maxUses: 6,
	name: "Ice Punch",
	price: 0,
	id: "ice_punch",
});
