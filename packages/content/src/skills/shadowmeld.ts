import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Blend into the shadows to enhance your armor class and sharpen your accuracy.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 3,
				},
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 3,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1dWGnsVHDHZWQOZRy?alt=media&token=d29aaa04-a0a6-45b6-931f-867a0796a635",
	level: 1,
	maxUses: 8,
	name: "Shadowmeld",
	price: 0,
	id: "shadowmeld",
});
