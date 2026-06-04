import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Exploit armour weaknesses to maximize the impact of attacks.",
	effects: [
		{
			difficulty: 21,
			duration: 6,
			modifier: "dexterity",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -8,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh2aa9hENKmzll2Md-?alt=media&token=811b82c0-59e5-4f46-afbd-0993015d3472",
	level: 3,
	maxUses: 4,
	name: "Expose Weakness",
	price: 0,
	id: "expose_weakness",
});
