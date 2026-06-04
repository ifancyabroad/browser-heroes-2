import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Strike the enemy from above as you leap over them in an attempt to get behind.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			accuracy: 50,
			duration: 1,
			properties: [
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: 8,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqZdRYK5clYyJxqQKi?alt=media&token=7529994a-db1d-47e4-8a6f-b1b517e85d8c",
	level: 1,
	maxUses: 2,
	name: "Acrobatic Strike",
	price: 90,
	id: "acrobatic_strike",
});
