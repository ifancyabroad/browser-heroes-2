import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadowmeld",
	name: "Shadowmeld",
	description: "Blend into the shadows to enhance your armor class and sharpen your accuracy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1dWGnsVHDHZWQOZRy?alt=media&token=d29aaa04-a0a6-45b6-931f-867a0796a635",
	pool: "assassin",
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
					stat: "armourClass",
					operation: "add",
					value: 3,
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
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
					stat: "armourClass",
					operation: "add",
					value: 5,
					durationTurns: 9,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
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
					stat: "armourClass",
					operation: "add",
					value: 6,
					durationTurns: 10,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
