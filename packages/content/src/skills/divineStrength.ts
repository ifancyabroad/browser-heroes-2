import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_strength",
	name: "Divine Strength",
	description: "Infuse yourself with divine might, bolstering physical prowess.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkOF38JibaTuWhFGg_?alt=media&token=18908b64-c7c2-4581-b0b6-04b48c601aaf",
	pool: "cleric",
	category: "buff",
	maxUses: 6,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 8,
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
					value: 12,
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
					value: 16,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
