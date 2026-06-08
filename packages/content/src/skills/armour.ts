import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour",
	name: "Armour",
	description: "Conjure a thin layer of physical protection.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3xhpxzM4iz55_jXYj?alt=media&token=671e90b7-e472-4ad0-b5aa-47febe8bf8bb",
	pool: "mage",
	category: "buff",
	maxUses: 8,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 6,
					durationTurns: 10,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 9,
					durationTurns: 11,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 12,
					durationTurns: 12,
				},
			],
		},
	],
	tags: [],
});
