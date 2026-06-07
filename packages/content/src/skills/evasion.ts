import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description: "Swiftly dodge incoming attacks, greatly reducing the chance of being hit.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh-SuuVlmZIYSG87sp?alt=media&token=50aaef62-ac5c-4a23-8360-e7e26095a333",
	pool: "rogue",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 3,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 10,
					durationTurns: 3,
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
					value: 15,
					durationTurns: 4,
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
					value: 20,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
