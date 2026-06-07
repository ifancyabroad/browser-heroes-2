import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "battle_cry",
	name: "Battle Cry",
	description: "Amplify your strength with a resounding Battle Cry.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhggr8CtVaNEZYVBilF?alt=media&token=a574eb3a-0e7e-4582-ac8b-a8fa654ff4a0",
	pool: "barbarian",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 8,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 6,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 9,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 12,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
