import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGS9HEr6Mb0wEKjYLh?alt=media&token=a0a2a938-e0a7-4952-96f9-957691195c98",
	pool: "unique",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 6,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
