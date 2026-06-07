import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dancing_defense",
	name: "Dancing Defense",
	description:
		"Greatly increases defense and chance for a critical strike with rhythmic movement.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqWi-RbH2vwtAawttY?alt=media&token=b906457e-c916-43b2-957d-036855d70eb9",
	pool: "warrior",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 4,
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 4,
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 6,
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 8,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
