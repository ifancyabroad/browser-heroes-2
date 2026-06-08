import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_upon_rit_chi",
	name: "Call Upon Rit Chi",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9__YsYeJoI_hGpg6Ba?alt=media&token=9df26944-5d84-4818-a6eb-1284025422dc",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 4,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 4,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 4,
					durationTurns: 6,
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
					value: 6,
					durationTurns: 7,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 6,
					durationTurns: 7,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 6,
					durationTurns: 7,
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
					value: 8,
					durationTurns: 8,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 8,
					durationTurns: 8,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 8,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
