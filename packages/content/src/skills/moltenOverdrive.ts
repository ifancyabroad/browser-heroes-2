import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 4,
				},
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: 4,
				},
				{
					name: "crushing",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCK1lVEhQnzlaTAST3j?alt=media&token=7979c186-71db-4fd9-9147-1b0bf2479ca7",
	level: 4,
	maxUses: 1,
	name: "Molten Overdrive",
	price: 0,
	id: "molten_overdrive",
});
